module.exports = async (arg1, arg2) => {
    const attrs = await arg1.get({ schema: true })
    console.log('DP_REFRESH data from device: ', attrs, arg2);
}