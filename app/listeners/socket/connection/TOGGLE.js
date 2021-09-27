const DevicesController = require('@instances/tuya')

module.exports = async (socket, payload) => {
    const device = DevicesController.toggle(payload.id)
}
