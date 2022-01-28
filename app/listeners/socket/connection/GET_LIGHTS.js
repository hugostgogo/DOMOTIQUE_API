const DevicesController = require('@instances/tuya')

module.exports = async (socket, IO, payload) => {
    const lights = await DevicesController.get()
    socket.emit('LIGHTS', lights)
}
