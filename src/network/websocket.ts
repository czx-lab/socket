// default WebSocket URL
const defaultWsUrl = 'ws://localhost:8080' 
// default reconnect options
const defaultReconnectOptions = false 
// default retry interval in milliseconds
const defaultRetryInterval = 1000

// reconnect options
// options: { maxRetries: number, retryInterval: number, onMaxRetriesReached: () => void }
// maxRetries: number - maximum number of retries before giving up
// retryInterval: number - interval between retries in milliseconds
// onMaxRetriesReached: () => void - callback function to be called when max retries are reached
// onRetry: () => void - callback function to be called when retrying
export type AuthReconnectOptions = boolean | {
    maxRetries?: number
    retryInterval?: number
    onMaxRetriesReached?: () => void
    onRetry?: () => void
}

// WebSocket connection status
// Disconnected: The WebSocket connection is closed or not established
// Connected: The WebSocket connection is open and ready to communicate
// Error: The WebSocket connection is in an error state
export enum ConnStatus {
    Disconnected = 'DISCONNECTED',
    Connected = 'CONNECTED',
    Error = 'ERROR'
}

// event types
// Connected: The WebSocket connection is established
// Disconnected: The WebSocket connection is closed
// Error: An error occurred during the WebSocket connection
// Message: A message is received from the WebSocket server
export enum EventType { 
    Connected = 'connected',
    Disconnected = 'disconnected',
    Error = 'error',
    Message = 'message'
}

// WebSocket configuration
export type WebsocketConf = { 
    url: string // WebSocket URL
    authReconnectOptions?: AuthReconnectOptions
}

// Error: WebSocketService is already exist
const ErrExist = new Error('WebSocketService is already exist') 

class WebsocketService {
    // singleton instance
    private static instance: WebsocketService 
    // WebSocket instance
    private socket: WebSocket | null = null 
    // event listeners
    private listeners: { [key: string]: Function[] } = {} 
    // configuration object
    private _conf: WebsocketConf = { url: defaultWsUrl, authReconnectOptions: defaultReconnectOptions } 
    // maximum number of retries
    private retries: number = 0 
    // connection status
    private _connStatus: ConnStatus = ConnStatus.Disconnected 

    private constructor() {}

    // singleton instance getter
    static getInstance(): WebsocketService {
        if (!this.instance) {
            this.instance = new WebsocketService()
        }

        return this.instance
    }

    get connStatus(): ConnStatus {
        return this._connStatus
    }

    set conf(conf: WebsocketConf) {
        this._conf = conf
    }

    // send data to the WebSocket server
    // data: any - data to be sent to the server
    // if the WebSocket connection is not open, log an error message
    send(data: any) { 
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not open. Unable to send data.')
            return 
        }

        this.socket.send(data)
    }

    // close the WebSocket connection
    close() { 
        this.socket && this.socket.close()
    }

    // start the WebSocket connection
    start() { 
        if (this.socket) {
            throw ErrExist // throw an error if the WebSocketService is already exist
        }

        // reset the retry count
        this.retries = 0 
        this.connect() // connect to the WebSocket server
    }

    // connect to the WebSocket server
    private connect() { 
        // create a new WebSocket instance
        this.socket = new WebSocket(this._conf.url) 
        // connection opened
        this.socket.onopen = () => { 
            this._connStatus = ConnStatus.Connected
            this.emit(EventType.Connected)
        }
        // connection error
        this.socket.onerror = (event) => {
            this._connStatus = ConnStatus.Error
            this.emit(EventType.Error, event)
        }
        // connection closed 
        this.socket.onclose = (event) => {
            this._connStatus = ConnStatus.Disconnected
            this.emit(EventType.Disconnected, event)

            // try to reconnect if reconnect options are defined
            // if reconnect options are a boolean, return true
            if (this.reconnect()) setTimeout(() => this.connect(), this.getRetryInterval())
        }
        // message received
        this.socket.onmessage = (event) => {
            this.emit(EventType.Message, event.data)
        }
    }

    // reconnect to the WebSocket server
    private reconnect(): boolean {
        if (typeof this._conf.authReconnectOptions === 'boolean') {
            return this._conf.authReconnectOptions
        }

        if (this._conf.authReconnectOptions) {
            const { maxRetries, onMaxRetriesReached, onRetry } = this._conf.authReconnectOptions
            // check if maxRetries is defined
            if (!maxRetries) return false

            // check if maxRetries is reached
            if (this.retries < maxRetries) { 
                this.retries++
                
                // call the retry callback function
                onRetry && onRetry() 
                return true
            }

            // if maxRetries is reached, call the callback function
            onMaxRetriesReached && onMaxRetriesReached()
            return false
        }

        return false
    }

    // get the retry interval
    // if authReconnectOptions is a boolean, return 1000ms
    // if authReconnectOptions is an object, return the retryInterval property or 1000
    private getRetryInterval(): number {
        if (typeof this._conf.authReconnectOptions === 'boolean') return defaultRetryInterval

        if (this._conf.authReconnectOptions) {
            const { retryInterval } = this._conf.authReconnectOptions
            return retryInterval ? retryInterval : defaultRetryInterval
        }

        return defaultRetryInterval
    }

    // emit an event to all listeners
    private emit(event: EventType, data: any = null) { 
        if (!this.listeners[event]) return

        this.listeners[event].forEach((listener) => listener(data))
    }

    // add an event listener
    // event: EventType - event type
    // listener: Function - callback function to be called when the event is emitted
    // if the event is Connected and the connection status is Connected, call the listener immediately
    on(event:EventType, listener: Function) { 
        if (!this.listeners[event]) this.listeners[event] = []

        this.listeners[event].push(listener)

        if (event === EventType.Connected && this.connStatus === ConnStatus.Connected) {
            listener()
        }
    }

    // remove an event listener
    // event: EventType - event type
    // listener: Function - callback function to be removed
    off(event: EventType, listener: Function) {
        if (!this.listeners[event]) return
        this.listeners[event] = this.listeners[event].filter((l) => l !== listener)
    }

    // watch for connection status changes
    // callback: (status: ConnStatus) => void - callback function to be called when the connection status changes
    watchConnStatus(callback: (status: ConnStatus) => void) { 
        this.on(EventType.Connected, () => callback(ConnStatus.Connected))
        this.on(EventType.Disconnected, () => callback(ConnStatus.Disconnected))
        this.on(EventType.Error, () => callback(ConnStatus.Error))
    }
}

declare global {
    var instance: WebsocketService
}

!global.instance && (global.instance = WebsocketService.getInstance())

export default global.instance
