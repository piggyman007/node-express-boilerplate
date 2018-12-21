const config = {
  port: process.env.PORT || 3000,
  logger: {
    name: '{{package.name}}',
    level: process.env.LOG_LEVEL || 'info',
    levels: {
      debug: 'STDOUT',
      error: 'STDERR'
    }
  }
};

module.exports = config;
