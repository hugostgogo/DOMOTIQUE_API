const DevicesController = require('@instances/tuya')

module.exports = async (device, name) => {
    const response = await DevicesController.getValues(1)
    console.log("\x1b[34m", `DATA ${name}`, "\x1b[37m");
    console.table(response.dps)
}