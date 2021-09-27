const DevicesController = require('../../../Controllers/DevicesController')

module.exports = async (device, name) => {
    console.log("\x1b[32m", `CONECTED to ${name} ${device.device.ip}:${device.device.port}`, "\x1b[37m")
    if (DevicesController.devices.length == device.foundDevices.length) {

        console.log("\x1b[32m", `*** ALL TUYA DEVICES CONNECTED (${DevicesController.devices.length}) ***`)
        console.log(            `-----------------------------------------`, "\x1b[37m")
    }
}