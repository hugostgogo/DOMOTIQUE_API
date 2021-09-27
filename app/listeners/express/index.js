const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        const response = await DevicesController.getValues(1)
        console.log(response)
        res.json(response)
    }
}