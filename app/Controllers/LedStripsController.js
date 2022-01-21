const config = require('../../config/tuya.json')

const basePath = config.listeners.path
const ledStripsConfig = config.ledStrips

const LedStrip = require('@models/LedStrip')


class LedStripsController {
    constructor () {
        let ledStrips = []

        // load Events
        ledStripsConfig.lights.forEach(async (ledStrip, i) => {
            ledStrips.push(new LedStrip(ledStrip, i+1))
        })

        this.ledStrips = ledStrips
    }

    get (id) {
        let result;
        if (id) result = this.ledStrips.find(ledStrip => ledStrip.id == id)
        else if (!id) result = this.ledStrips

        return result
    }

    async toggle (id = null) {
        if (id != null) this.get(id).toggle()
        else this.ledStrips.forEach(async (ledStrip) => {
            ledStrip.toggle()
        })
    }

    async setColor (r, g, b) {
        let result = []

        this.ledStrips.forEach(async (ledStrip) => {
            const response = await ledStrip.setColor(r, g, b)
            result.push(response)
        })

        return result
    }
}

module.exports = new LedStripsController()