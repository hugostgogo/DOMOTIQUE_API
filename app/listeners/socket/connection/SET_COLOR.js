const DevicesController = require('@instances/tuya')

module.exports = async (socket, payload) => {
    const device = DevicesController.get(payload.id)
    await device.setColor(payload.color)
}
