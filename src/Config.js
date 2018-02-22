var config = require('config');

module.exports.get = function(arg) {
    try {
        return config.get(arg);
    } catch (e) {
        throw e;
    }
};