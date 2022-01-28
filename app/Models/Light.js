require('module-alias/register')
const TuyaAPI = require('tuyapi')
const { IO } = require('../../preload/socket')

const {
    tuyaToRgba,
    rgbaToComputeds,
    rgbToTuya
} = require('../Mixins/tuyaMixin')

class Light {

    id;
    name;

    stats = {
        color: null,
        state: null,
        mode: null,
        brightness: null,
        temperature: null
    };

    #device;

    constructor(tuyaDevice, id) {
        const {
            name,
            credentials
        } = tuyaDevice

        this.id = credentials.id
        this.name = name

        this.#device = new TuyaAPI({
            id: credentials.id,
            key: credentials.key,
            issueGetOnConnect: false
        })

        this.#device.on('connected', async () => {
            console.log(`CONNECTED TO ${this.name}`)
            const { dps } = await this.#device.get({ schema: true })
            this.schemaToAttrs(dps)
            IO.emit('LIGHT', this)
        })

        this.#device.on('data', async ({ dps }, commandByte) => {
            if (commandByte == 8) this.schemaToAttrs(dps)
            IO.emit('LIGHT', this)
        })

        this.#device.on('dp-refresh', ({ dps }, commandByte) => {
            if (commandByte == 8) this.schemaToAttrs(dps)
            IO.emit('LIGHT', this)
        });

        this.connect()

        return this
    }

    async connect() {
        await this.#device.find();
        await this.#device.connect();

        const { dps } = await this.#device.refresh({ schema: true })
        this.schemaToAttrs(dps)
    }

    async reload () {
        const { dps } = await this.#device.refresh({ schema: true })
        return this.schemaToAttrs(dps)
    }

    schemaToAttrs(schema) {
        if ('1' in schema) this.stats.state = schema['1']
        if ('2' in schema) this.stats.mode = schema['2']
        if ('3' in schema) this.stats.brightness = schema['3']
        if ('4' in schema) this.stats.temperature = schema['4']
        if ('5' in schema) this.stats.color = rgbaToComputeds(tuyaToRgba(schema['5']))

        return this
    }


    async toggle () {
        const { dps } = await this.#device.set({ dps: 1, set: !this.stats.state })
        return this.schemaToAttrs(dps)
    }

    async setRGB (rgb) {
        const { dps } = await this.#device.set({ dps: 5, set: rgbToTuya(rgb) })
        return this.schemaToAttrs(dps)
    }

}

module.exports = Light