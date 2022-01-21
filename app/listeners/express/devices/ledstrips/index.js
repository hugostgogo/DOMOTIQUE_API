const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        const result = await DevicesController.get()
        res.json(result)
    }
}