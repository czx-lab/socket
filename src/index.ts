import WebsocketService, { EventType } from '@/network/websocket'

const service = WebsocketService.getInstance()
service.conf = {
    url: 'ws://localhost:13564',
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
})
service.on(EventType.Disconnected, () => {
    console.log('Disconnected from server.')
})
service.on(EventType.Error, (error: ErrorEvent) => {
    console.log('Error occurred.', error.error)

})
service.on(EventType.Message, (data: CloseEvent) => {
    console.log('Closed.', data)
})
