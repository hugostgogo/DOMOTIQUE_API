const config = require('../../config/tuya.json')

const basePath = config.listeners.path
const devicesConfig = config.devices

const Light = require('@models/Light')


class DevicesController {
    constructor () {
        let devices = []

        // load Events
        devicesConfig.lights.forEach(async (device, i) => {
            devices.push(new Light(device, i+1))
        })

        this.devices = devices
    }

    get (id) {
        let result;
        if (id) result = this.devices.find(device => device.id == id)
        else if (!id) result = this.devices

        return result
    }

    async getValues (id) {
        let result;
        if (id) result = await this.get(id).getValues()
        else result = this.get().map(async (device) => { return await device.getValues() })

        return result
    }

    getByTuyaId (tuyaId) {
        let result;
        if (tuyaId) result = this.devices.find(device => device.tuyaID == tuyaId)
        else result = false

        return result
    }

    async toggle (id = null) {
        if (id != null) this.get(id).toggle()
        else this.devices.forEach(async (device) => {
            device.toggle()
        })
    }

    async setColor (r, g, b) {
        let result = []

        this.devices.forEach(async (device) => {
            const response = await device.setColor(r, g, b)
            result.push(response)
        })

        return result
    }
}

module.exports = new DevicesController()