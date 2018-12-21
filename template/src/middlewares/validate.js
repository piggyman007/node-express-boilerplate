const validator = require('../libs/validator');
const config = require('../config');
const logger = require('../libs/logger');

const log = logger(config.logger);

module.exports = (req, res, next) => {
  let validation = { valid: true };

  switch (req.method.toLowerCase()) {
    case 'post':
    case 'put':
    case 'patch':
      validation = validator.validate(req);
      break;
    default:
      break;
  }

  if (validation.valid) {
    return next();
  }

  const errorMessage = validation.GetFormattedErrors()[0].message;
  const errorStatus = 400;
  log.error({ uuid: req.uuid, method: req.method, url: req.baseUrl }, `Error ${errorStatus} (${errorMessage}) with payload ${req.body}.`);
  return res.status(errorStatus).json({ status: errorStatus, error: errorMessage });
};
