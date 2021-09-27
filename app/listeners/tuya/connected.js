const DevicesController = require('@instances/tuya')

module.exports = async (apiDevice, name) => {
    const device = DevicesController.getByTuyaId(apiDevice.device.id)
    device.init()
    console.log("\x1b[32m", `CONECTED to ${device.name} ${apiDevice.device.ip}:${apiDevice.device.port}`, "\x1b[37m")
}