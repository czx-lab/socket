// data structure for buffer data
export type BufferData = { 
    id: number
    payload: Uint8Array<ArrayBuffer>
}

// Processor configuration
// It is used to configure the processor
export type ProcessorConf = {
    littleEndian: boolean // little endian or big endian
    messageLenType: MessageLenType
}

// length of the message
export enum MessageLenType {
    Uint8 = 1,  // 1 byte
    Uint16,     // 2 bytes
    _,          // reserved
    Uint32      // 4 bytes
}

// Error: Buffer is too small
const ErrBufferTooSmall = new Error('Buffer is too small') 
// Error: Buffer is invalid
const ErrBufferInvalid = new Error('Buffer is invalid') 

// Processor class to process the buffer
// It is used to decode the buffer by the length type
class Processor {
    private _conf: ProcessorConf = {
        littleEndian: false,
        messageLenType: MessageLenType.Uint16
    }
    // buffer to store the data
    private _buffer: Buffer<ArrayBufferLike> = Buffer.alloc(0) 

    set conf(conf: ProcessorConf) {
        this._conf = conf
    }

    // encode the data by the length type
    // example: 
    // gateway.proto
    // ```
    // syntax = "proto3";
    // package gateway;
    // message AuthReq {
    //     required string username = 1;
    //     required string password = 2;
    // }
    // ```
    //  
    // ```
    // npm i -g protobufjs-cli
    //
    // pbjs -t static-module -w commonjs -o gateway.js gateway.proto
    //
    // pbts -o gateway.d.ts gateway.js
    // ```
    // 
    // ```ts
    // const authReq = new gateway.AuthReq()
    // authReq.username = 'username'
    // authReq.password = 'password'
    // gateway.AuthReq.encode(authReq).finish()
    // ```
    encode(id: number, data: any): Uint8Array {
        const buffer = data instanceof Uint8Array ? data : data.toArrayBuffer ? new Uint8Array(data.toArrayBuffer()) : Buffer.from(data as any)
        const header = Buffer.alloc(this._conf.messageLenType*2) // Allocate header based on message length type
        const bufferLength = buffer.length + this._conf.messageLenType
    
        // Helper function to get the appropriate write function
        const getWriteFunction = (): ((value: number, offset?: number) => number) => {
            switch (this._conf.messageLenType) {
                case MessageLenType.Uint8:
                    return header.writeUInt8
                case MessageLenType.Uint16:
                    return this._conf.littleEndian ? header.writeUInt16LE : header.writeUInt16BE
                case MessageLenType.Uint32:
                    return this._conf.littleEndian ? header.writeUInt32LE : header.writeUInt32BE
                default:
                    throw new Error(`Unsupported message length type: ${this._conf.messageLenType}`)
            }
        }
    
        const writeFunction = getWriteFunction()
    
        // Write the buffer length and ID to the header
        writeFunction.call(header, bufferLength, 0)
        writeFunction.call(header, id, this._conf.messageLenType)
    
        // Concatenate the header and the buffer
        return Buffer.concat([header, buffer])
    }

    // decode the buffer by the length type
    // Uint8: 1 byte
    // Uint16: 2 bytes
    // Uint32: 4 bytes
    // return the id and payload
    async decode(data: Blob): Promise<BufferData[]> {
        const buffer = await data.arrayBuffer()
        if (buffer.byteLength < this._conf.messageLenType) throw ErrBufferTooSmall

       return this.decodeArrayBuffer(buffer)
    }

    // decode the buffer by the length type
    decodeArrayBuffer(data: ArrayBuffer): BufferData[] {
        const message = new Uint8Array(data)
        return this.parse(Buffer.from(message))
    }

    // parse the buffer by the length type
    private parse(buffer: Buffer<ArrayBufferLike>): Array<BufferData> {
        const results: BufferData[] = []

        this._buffer = Buffer.concat([this._buffer, buffer])
        let offset: number = 0

        while (offset + this._conf.messageLenType <= this._buffer.length) {
            let msgLength = 0

            // Determine message length based on the configured type
            switch (this._conf.messageLenType) {
                case MessageLenType.Uint8:
                    msgLength = this._buffer.readUInt8(offset)
                    break
                case MessageLenType.Uint16:
                    msgLength = this._conf.littleEndian ? this._buffer.readUInt16LE(offset) : this._buffer.readUInt16BE(offset)
                    break
                case MessageLenType.Uint32:
                    msgLength = this._conf.littleEndian ? this._buffer.readUInt32LE(offset) : this._buffer.readUInt32BE(offset)
                    break
                default:
                    throw ErrBufferInvalid
            }

            const totalLength = msgLength + this._conf.messageLenType
            if (offset + totalLength > this._buffer.length) break

            // Extract message payload
            const payload = this._buffer.subarray(offset, offset + totalLength)
            results.push({ id: offset, payload: new Uint8Array(payload) })

            offset += totalLength
        }

        // Retain unprocessed data in the buffer
        this._buffer = this._buffer.subarray(offset)
        return results
    }
}

export default Processor