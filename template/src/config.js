const config = {
  port: process.env.PORT,
  logger: {
    name: '{{package.name}}',
    level: process.env.LOG_LEVEL,
    levels: {
      debug: 'STDOUT',
      error: 'STDERR'
    }
  }
}

module.exports = config;
