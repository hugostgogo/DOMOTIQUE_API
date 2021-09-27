const config = require('../config/tuya.json')

const basePath = config.listeners.path
const devicesConfig = config.devices

const Device = require('../Models/Device')


class DevicesController {
    constructor () {
        let devices = []

        // load Events
        devicesConfig.forEach(async (device, i) => {
            devices.push(new Device(device, i+1))
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

    async setColor (color, id = null) {
        console.log(color, id ? 'single' : 'multi', id)
        if (id != null) this.get(id).setColor(color)
        else this.devices.forEach(async (device) => {
            device.setColor(color)
        })
    }
}

module.exports = new DevicesController()