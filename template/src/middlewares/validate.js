const validator = require('../libs/validator');
const config = require('../config');
const logger = require('../libs/logger')(config.logger);
const formatter = require('../libs/formatter');

module.exports = async (req, res, next) => {
  const validation = await validator.validate(req);
  if (validation.valid) {
    return next();
  }

  const { message } = validation.GetFormattedErrors()[0];
  const status = 400;
  const logFormat = formatter.formatResponseError(req, status, message);
  logger.error(logFormat.details, logFormat.msg);
  return res.status(status).json({ status, error: message });
};
