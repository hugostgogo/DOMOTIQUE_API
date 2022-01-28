const config = require('../../config/tuya.json')

const basePath = config.listeners.path
const devicesConfig = config.devices

const Light = require('@models/Light')

class DevicesController {

    devices;

    constructor () {
        let devices = []

        // load Events
        devicesConfig.lights.forEach(async (device, i) => {
            devices.push(new Light(device, i+1))
        })

        this.devices = devices
    }

    set devices (val) {
        this.devices = val
    }

    get devices () {
        return this.devices.map(device => device.reload())
    }

    async get (id = null) {
        if (id == null) return this.devices;
        else if (Array.isArray(id)) return this.devices.filter(device => device.id in id);
        else return this.devices.find(device => device.id == id)
    }

    async toggle (id = null) {
        const isSingle = !Array.isArray(id) && id !== null
        const toToggle = isSingle ? await this.get(id) : await this.get();

        if (isSingle) return await toToggle.toggle()
        else return await toToggle.map(async light => await light.toggle())        
    }

    async setRGB (rgb, id = null) {
        const isSingle = (!Array.isArray(id) && id !== null)
        const toSet = isSingle ? await this.get(id) : await this.get();
        
        if (isSingle) return await toSet.setRGB(rgb)
        else return await toSet.map(async light => await light.setRGB(rgb))
    }
}

module.exports = new DevicesController()