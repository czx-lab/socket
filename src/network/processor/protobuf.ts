import type {  MessageProcessor, ProcessorConf, BufferData } from '@/network/processor'
import {MessageLenType, SocketType} from '@/network/processor'

// Error: Buffer is too small
const ErrBufferTooSmall = new Error('Buffer is too small') 

// Processor class to process the buffer
// It is used to decode the buffer by the length type
class Processor implements MessageProcessor {
    private _conf: ProcessorConf = {
        littleEndian: false,
        statusCode: false,
        messageLenType: MessageLenType.Uint16,
        socketType: SocketType.WebSocket
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
        const header = Buffer.alloc(this._conf.messageLenType + 2) // Allocate header based on message length type

        if (this._conf.socketType == SocketType.WebSocket) {
            header.writeUInt16BE(id, 0)
            return Buffer.concat([header, buffer])
        }

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

        const bufferLength = buffer.length + this._conf.messageLenType
    
        // Bind the function to the header instance
        const writeFunction = getWriteFunction().bind(header) 
        // Write the buffer length and ID to the header
        writeFunction(bufferLength, 0)
        writeFunction(id, this._conf.messageLenType)
    
        // Concatenate the header and the buffer
        return Buffer.concat([header, buffer])
    }

    // decode the buffer by the length type
    // Uint8: 1 byte
    // Uint16: 2 bytes
    // Uint32: 4 bytes
    // return the id and payload
    async decode(data: Blob): Promise<BufferData[]> {
        let buffer: ArrayBuffer | null = null
        if (!Blob.prototype.arrayBuffer) {
            buffer = await new Response(data).arrayBuffer()
        } else {
            buffer = await data.arrayBuffer()
        }
        if (buffer.byteLength < this._conf.messageLenType) throw ErrBufferTooSmall

        return this.decodeArrayBuffer(buffer)
    }

    // decode the buffer by the length type
    decodeArrayBuffer(data: ArrayBuffer): BufferData[] {
        const message = new Uint8Array(data)
        if (this._conf.socketType === SocketType.WebSocket) {
            const bufferdata = this.parseBuffer(Buffer.from(message.buffer))
            return [bufferdata]
        }

        return this.parse(Buffer.from(message.buffer))
    }

    // parse the buffer by the length type
    private parse(buffer: Buffer<ArrayBufferLike>): Array<BufferData> {
        const results: BufferData[] = []

        this._buffer = Buffer.concat([this._buffer, buffer])
        let offset: number = 0

        while (offset + this._conf.messageLenType <= this._buffer.length) {
            // Helper function to get the appropriate read function
            const getReadFunction = (): ((offset?: number) => number) => {
                switch (this._conf.messageLenType) {
                    case MessageLenType.Uint8:
                        return this._buffer.readUInt8
                    case MessageLenType.Uint16:
                        return this._conf.littleEndian ? this._buffer.readUInt16LE : this._buffer.readUInt16BE
                    case MessageLenType.Uint32:
                        return this._conf.littleEndian ? this._buffer.readUInt32LE : this._buffer.readUInt32BE
                    default:
                        throw new Error(`Unsupported message length type: ${this._conf.messageLenType}`)
                }
            }
            const readFunction = getReadFunction().bind(this._buffer) 
            const msgLength = readFunction(offset)
            const totalLength = msgLength + this._conf.messageLenType
            if (offset + totalLength > this._buffer.length) break

            // Extract message payload
            const payload = this._buffer.subarray(offset, offset + totalLength)
            const bufferdata = this.parseBuffer(payload)
            results.push(bufferdata)
            offset += totalLength
        }

        // Retain unprocessed data in the buffer
        this._buffer = this._buffer.subarray(offset)
        return results
    }

    private parseBuffer(buffer: Buffer): BufferData {
        var code: number = 200 
        var msgid: number = 0
        var payload: Uint8Array
        const dataview = new DataView(buffer.buffer)
        if (this._conf.statusCode) {
            code = dataview.getUint16(this._conf.messageLenType, this._conf.littleEndian)
            msgid = dataview.getUint16(this._conf.messageLenType + 2, this._conf.littleEndian)
            payload = buffer.subarray(this._conf.messageLenType + 4)
        } else {
            msgid = dataview.getUint16(this._conf.messageLenType, this._conf.littleEndian)
            payload = buffer.subarray(this._conf.messageLenType + 2)
        }

        return {code: code, id: msgid, payload: payload}
    }
}

export default Processor