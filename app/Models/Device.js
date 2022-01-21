require('module-alias/register')

const TuyaAPI = require('tuyapi');
const fs = require("fs").promises

const config = require('../../config/tuya.json')
const basePath = process.basePath + config.listeners.path

class Device {

    id;
    tuyaID;
    name;
    state;
    connected;
    #device;

    constructor(args, id) {
        this.id = id
        this.name = args.name
        this.tuyaID = args.credentials.id
        this.connected = false;

        const device = new TuyaAPI({
            id: args.credentials.id,
            key: args.credentials.key,
            issueGetOnConnect: false
        })

        device.find().then(async() => {
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

        return this
    }

    get device() {
        return this.#device
    }

    async getValues() {
        const result = await this.#device.get({ schema: true })
        return result
    }
}

module.exports = Device