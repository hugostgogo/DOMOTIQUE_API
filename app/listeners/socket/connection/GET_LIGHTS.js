const DevicesController = require('@instances/tuya')

module.exports = async (socket) => {
    const devices = DevicesController.get()

    console.log(devices.state)
    socket.emit('LIGHTS', devices)
}
