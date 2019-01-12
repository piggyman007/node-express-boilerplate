module.exports = {
  port: process.env.PORT || 3000,
  shutdownTimeout: process.env.SHUTDOWN_TIMEOUT || 1000,
  logger: {
    name: 'sign-ap-is',
    level: process.env.LOG_LEVEL || 'info'
  }
};
