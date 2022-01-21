const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const http = require('http');
const server = http.createServer(app);

const config = require('../config/express')

const fs = require("fs").promises
var ip = require("ip");

const basePath = process.basePath + config.listeners.path
const methods = ['get', 'post', 'put', 'delete']

async function loadDirectory(dir) {
    const result = await fs.readdir(dir)

    result.forEach(async (file) => {
        const currentFilePath = `${dir}${file}`
        const fileStats = await fs.lstat(currentFilePath)

        if (fileStats.isFile()) {
            const listener = require(currentFilePath)
            let name = `/${currentFilePath.slice(basePath.length).slice(0, -3)}`

            if (name.endsWith('index')) name = name.slice(0, -5)
            if (name.endsWith('id')) name = name.slice(0, -2) + ':id'

            methods.forEach(async (method) => {

                if (listener[method]) {
                    console.log(`${method.toUpperCase()} ${name}`)
                    app[method](`${name}`, listener[method].bind())
                }
            })
        }

        if (fileStats.isDirectory()) loadDirectory(`${dir}${file}/`)

    })
}

loadDirectory(basePath)
server.listen(config.port, (args) => {
    console.log('EXPRESS LOADED', `http://${ip.address()}:${config.port}`)
});


module.exports = { server }


