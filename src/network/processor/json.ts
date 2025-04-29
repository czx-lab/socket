import type {  MessageProcessor, ProcessorConf, BufferData } from '@/network/processor'
import {MessageLenType, SocketType} from '@/network/processor'

// Error: Buffer is too small
const ErrBufferTooSmall = new Error('Buffer is too small') 
// Error: Buffer is invalid
const ErrBufferInvalid = new Error('Buffer is invalid') 

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

    // decode the data by the length type
    // example:
    async decode(data: Blob): Promise<BufferData[]> {
        const buffer = await data.arrayBuffer()
        if (buffer.byteLength < this._conf.messageLenType) throw ErrBufferTooSmall
        return this.decodeArrayBuffer(buffer)
    }

    decodeArrayBuffer(data: ArrayBuffer): BufferData[] {
        const message = new Uint8Array(data)
        if (this._conf.socketType === SocketType.WebSocket) {
            return this.parseBuffer(Buffer.from(message.buffer))
        }

        return this.parse(Buffer.from(message.buffer))
    }

    private parseBuffer(buffer: Buffer): BufferData[] {
        var code: number = 200
        var payload: Uint8Array
        const dataview = new DataView(buffer.buffer)
        if (this._conf.statusCode) {
            code = dataview.getUint16(this._conf.messageLenType, this._conf.littleEndian)
            payload = buffer.subarray(this._conf.messageLenType + 2)
        } else {
            payload = buffer.subarray(this._conf.messageLenType)
        }

        const jsonString = new TextDecoder().decode(payload)
        const jsondata = JSON.parse(jsonString)
        const values: BufferData[] = []
        Object.keys(jsondata).forEach((key) => {
            values.push({ id: key, code: code, payload: jsondata[key] })
        })

        return values
    }

    // encode the data by the length type
    // example:
    encode(id: string, data: any): Uint8Array {
        throw new Error('Method not implemented.')
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
            results.push(...this.parseBuffer(Buffer.from(payload)))
            offset += totalLength
        }

        // Retain unprocessed data in the buffer
        this._buffer = this._buffer.subarray(offset)
        return results
    }
}

export default Processor