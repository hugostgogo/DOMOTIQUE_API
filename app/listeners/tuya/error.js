const DevicesController = require('@instances/tuya')

module.exports = async (device) => {
    const disconnected = DevicesController.getByTuyaId(device.device.id)
    console.log("\x1b[31m", `ERROR`, disconnected.name, "\x1b[31m")
}