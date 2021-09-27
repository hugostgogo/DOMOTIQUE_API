const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        const r = req.query.r || parseInt(Math.random() * 255)
        const g = req.query.g || parseInt(Math.random() * 255)
        const b = req.query.b || parseInt(Math.random() * 255)

        console.log(r,g,b)
        const device = await DevicesController.get(req.params.id)
        const result = await device.setColor(r, g, b)
        res.json(result)
    },

    post: async (req, res) => {
        await DevicesController.toggle()
        const result = await DevicesController.get()
        res.json(result)
    }
}