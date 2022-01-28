const DevicesController = require('@instances/tuya')

module.exports = async (socket, IO, payload) => {
    await DevicesController.toggle(payload)
}
