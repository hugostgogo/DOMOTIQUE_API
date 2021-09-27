require('module-alias/register')

const TuyaAPI = require('tuyapi');
const fs = require("fs").promises

const config = require('../config/tuya.json')
const basePath = config.listeners.path

class Device {

    id;
    tuyaID;
    name;
    #device;

    constructor(args, id) {
        this.id = id
        this.name = args.name
        this.tuyaID = args.credentials.id


        const device = new TuyaAPI({
            id: args.credentials.id,
            key: args.credentials.key,
            issueGetOnConnect: false
        })

        device.find().then(async () => {
            device.connect();
        });

        fs.readdir(basePath).then(result => {
            result.forEach((file) => {
                const name = file.slice(0, -3)
                const listener = require(`${basePath + file}`)
                device.on(`${name}`, listener.bind(null, device, args.name))
            })
        })

        this.#device = device

        console.log(this)
        return this
    }

    get manager() {
        return this.#device
    }

    get state() {
        return (async () => { await this.#device.get() })
    }

    async toggle() {
        this.__state = await this.#device.toggle()
        return this
    }

    async setColor(color) {
        console.log(color)
        await this.#device.set({
            multiple: true,
            data: {
                '1': true,
                '2': 'colour',
                '3': 255,
                '4': 255,
                '5': {
                    'h': 0,
                    's': 255,
                    'v': 255
                }
            }
        })
    }

    async getValues () {
        const result = await this.#device.get({schema: true})
        return result
    }
}

module.exports = Device