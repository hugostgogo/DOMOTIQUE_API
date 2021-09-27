const { server } = require('./express')
const IO = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const config = require('../config/socket.json')

const fs = require("fs").promises

const basePath = config.listeners.path


IO.on('connection', async (socket) => {
    const result = await fs.readdir(basePath)
    result.forEach(async (file) => {
        const name = file.slice(0, -3)
        var listener = require(`${basePath + file}`)

        socket.on(`${name}`, listener.bind(null, socket))
    })

});

console.log('SOCKET IO LOADED')