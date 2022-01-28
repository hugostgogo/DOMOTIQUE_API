const { defaultMaxListeners } = require("tuyapi")
var tinycolor = require("tinycolor2");

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

const valueToHex = (value, pad) => {
    return value.toString(16).toLowerCase().padStart(pad, '0')
}

const rgbToTuya = (rgb) => {
    let color = tinycolor(rgb)

    const h = parseInt(color.toHsv().h)
    const { r, g, b } = color.toRgb()

    return `${valueToHex(r, 2)}${valueToHex(g, 2)}${valueToHex(b, 2)}${valueToHex(h, 4)}ffff`
}



module.exports = {
    tuyaToRgba,
    rgbaToComputeds,
    rgbToTuya,
}