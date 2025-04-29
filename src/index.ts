import WebsocketService, { EventType } from '@/network/websocket'
import Processor from '@/network/processor/json'
import BufferProc from '@/network/processor/protobuf'
import { MessageLenType } from './network/processor'
import * as hello from '@/pb/hello'

const processor = new Processor()
processor.conf = {
    littleEndian: false,
    statusCode: true,
    messageLenType: MessageLenType.Empty,
    socketType: 1,
}

const bufferproc = new BufferProc()
bufferproc.conf = {
    littleEndian: false,
    statusCode: true,
    messageLenType: MessageLenType.Empty,
    socketType: 1,
}
const service = WebsocketService.getInstance()
service.conf = {
    url: 'ws://localhost:8080',
    authReconnectOptions: {
        maxRetries: 5,
        retryInterval: 1000,
        onMaxRetriesReached: () => {
            console.log('Max retries reached.')
        },
        onRetry: () => {
            console.log('Retrying...')
        },
    },
}
service.start()
service.on(EventType.Connected, () => {
    console.log('Connected to server.')
    // const data = JSON.stringify({Hello: {
    //     Name: 'czx'
    // }})
    // service.send(data)
    // const datacopy = JSON.stringify({HelloCopy: {
    //     Name: 'czx'
    // }})
    // service.send(datacopy)

    const helloReq = hello.hello.HelloReq.create({ Name: 'czx' })
    const buffer = hello.hello.HelloReq.encode(helloReq).finish()
    console.log('Serialized Buffer:', buffer)
    const data = bufferproc.encode(1000, buffer)
    service.send(data)
})
service.on(EventType.Disconnected, () => {
    console.log('Disconnected from server.')
})
service.on(EventType.Error, (error: ErrorEvent) => {
    console.log('Error occurred.', error.error)
})
service.on(EventType.Message, async (data: Blob) => {
    // const decodedata = await processor.decode(data)
    // console.log("Decoded data: ", decodedata)

    const decodedata = await bufferproc.decode(data)
    const helloResp = hello.hello.HelloResp.decode((decodedata[0].payload) as Uint8Array)
    console.log(data, decodedata[0].code, decodedata[0].id, helloResp.Msg)
})
