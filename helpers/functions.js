const log = (message, type) => {
    return console.log(`[${type}] | ${message}`);
};

module.exports = { log };