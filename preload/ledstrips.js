const WebSocket = require('ws')

const socket = new WebSocket('ws://192.168.1.13/ws')

socket.on('open', () => {
    console.log('Connected to LED STRIP !')
})

socket.on('message', async (ledstripData) => {
    console.log(ledstripData)
})

socket.on('close', async () => {
    console.log('DISCONNECTED')
})

socket.on('error', async error => {
    console.error(`[error] ${error.message}`)
})