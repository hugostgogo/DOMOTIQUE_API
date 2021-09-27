const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        await DevicesController.toggle()
        const result = await DevicesController.get()
        res.json(result)
    }
}