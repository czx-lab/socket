// length of the message
export enum MessageLenType {
    Empty = 0,
    Uint8,      // 1 byte
    Uint16,     // 2 bytes
    Reserved,   // reserved
    Uint32      // 4 bytes
}

// socket type
export enum SocketType { 
    WebSocket = 1,  // websocket
    TcpSocket,      // tcp socket
    UdpSocket       // udp socket
}

// Processor configuration
// It is used to configure the processor
export type ProcessorConf = {
    littleEndian: boolean // little endian or big endian
    messageLenType: MessageLenType
    // status code or not
    statusCode: boolean
    // socket type
    socketType: SocketType 
}

// data structure for buffer data
export type BufferData = { 
    id: number | string
    code: number
    payload: any
}

// Message processor interface
// It is used to decode the buffer by the length type
export interface MessageProcessor {
    // decode the buffer by the length type
    decode(data: Blob): Promise<BufferData[]> 
    decodeArrayBuffer(data: ArrayBuffer): BufferData[]
    
    // encode the data by the length type
    encode(id: number|string, data: any): Uint8Array | string
}