require('module-alias/register')

const ColorsMixin = require('@mixins/colors')
const LedStripMixin = require('@mixins/ledstrip')

class LedStrip {

    mode;
    brightness;
    saturation;
    color;

    #device;

    constructor(args, id) {
        
    }

    async init() {
        this.connected = true;

        this.state = attrs.dps['1']
        this.mode = attrs.dps['2']
        this.brightness = attrs.dps['3']
        this.saturation = attrs.dps['4']
        this.color = attrs.dps['5']

        return this
    }

    get state() {
        return (async () => { await this.#device.get() ? true : false })
    }

    async toggle() {
        this.state = await this.#device.toggle()
        return this
    }

    async setColor(r, g, b) {
        const h = ColorsMixin.rgbToHex(r,g,b) // 3
        const s = 'ff' // 2
        const v = 'ff'// 2

        console.log("hue", `${h}`)
        const result = await this.#device.set({
            multiple: true,
            data: {
                '1': true,
                '2': 'colour',
                '5': `0000000${h}${s}${v}` // L 14
            }
        })
     

        return result
    }
}

module.exports = LedStrip