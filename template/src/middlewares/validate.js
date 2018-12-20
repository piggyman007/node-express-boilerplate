const validator = require('../libs/validator')
const config = require('../config')
const logger = require('../libs/logger')

const log = logger(config.logger)

module.exports = (req, res, next) => {
  let validation = { valid: true }

  switch (req.method.toLowerCase()) {
    case 'post':
    case 'put':
    case 'patch':
      validation = validator.validate(req)
      break
    default:
      break
  }

  if (validation.valid) {
    return next()
  }

  const errorMessage = validation.GetFormattedErrors()[0].message
  const errorStatus = 400
  log.error(`Error ${errorStatus} (${errorMessage}) on ${req.method} ${req.url} with payload ${req.body}.`)
  res.status(errorStatus).json({ status: errorStatus, error: errorMessage })
}
