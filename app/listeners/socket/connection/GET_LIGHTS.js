const DevicesController = require('@instances/tuya')

module.exports = async (socket) => {
    const devices = DevicesController.get(1)

    console.log(devices.state)
    socket.emit('LIGHTS', devices)
}
