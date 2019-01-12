const bunyan = require('bunyan');

module.exports = config => bunyan.createLogger({ name: config.name });
