const DevicesController = require('@instances/tuya')

module.exports = async (device) => {
    const disconnected = DevicesController.getByTuyaId(device.device.id)
    console.log("\x1b[33m", `DISCONECTED`, disconnected.name, "\x1b[3m")
}