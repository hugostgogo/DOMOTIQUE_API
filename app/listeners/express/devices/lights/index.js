const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        const lights = await DevicesController.get()
        res.json(lights)
    }
}