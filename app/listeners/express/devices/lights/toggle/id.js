const DevicesController = require('@instances/tuya')

module.exports = {
    get: async (req, res) => {
        let response;
        const id = req.params.id
        
        if (id == 0) await DevicesController.toggle()
        else if (id > DevicesController.devices.length) res.json({ error: `Pas d'appareil portant l'ID ${id}`})
        else await DevicesController.toggle(id)
        
        const result = await DevicesController.get(id)
        res.json(result)
    }
}