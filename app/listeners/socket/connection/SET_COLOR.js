const DevicesController = require('@instances/tuya')

module.exports = async (socket, IO, payload) => {
    await DevicesController.setRGB(payload.rgb, payload.id)
}
