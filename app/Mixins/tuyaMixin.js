const { defaultMaxListeners } = require("tuyapi")

const tuyaToRgba = (tuyaColorCode) => ({

    rgb: {
        r: hexToValue(tuyaColorCode.slice(0, 2)),
        g: hexToValue(tuyaColorCode.slice(2, 4)),
        b: hexToValue(tuyaColorCode.slice(4, 6)),
    },

    hex: {
        r: tuyaColorCode.slice(0, 2),
        g: tuyaColorCode.slice(2, 4),
        b: tuyaColorCode.slice(4, 6),
    },

    h: tuyaColorCode.slice(6, 10),
    v: tuyaColorCode.slice(10, 12),
    br: tuyaColorCode.slice(12, 14),
})

const rgbaToComputeds = ({ rgb, hex }) => ({
    rgb,
    computedHex: `#${hex.r}${hex.g}${hex.b}`,
    computedRGB: `#${hex.r}${hex.g}${hex.b}`,
})

const hexToValue = (hex) => {
    return parseInt(hex, 16)
}

const valueToHex = (value) => {
    return value.toString(16)
}

const rgbToTuya = ({ r, g, b }) => {
    return `${valueToHex(r)}${valueToHex(g)}${valueToHex(b)}0000FFFF`
}

module.exports = {
    tuyaToRgba,
    rgbaToComputeds,
    rgbToTuya
}