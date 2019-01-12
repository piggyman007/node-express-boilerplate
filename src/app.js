const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const helmet = require('helmet');
const config = require('./config');
const logger = require('./libs/logger')(config.logger);
const validate = require('./middlewares/validate');
const formatter = require('./libs/formatter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  req.uuid = uuidv1();

  res.responseSuccess = (status, data) => {
    const logFormat = formatter.formatResponseSuccess(req, status);
    logger.info(logFormat.details, logFormat.msg);
    res.status(status).json(data);
  };

  res.responseError = (err) => {
    const status = err.status || 500;
    const logFormat = formatter.formatResponseError(req, status, err.message);
    logger.error(logFormat.details, logFormat.msg);
    res.status(status).json({ status, error: err.message });
  };

  next();
});

/*
 * Routes
 */
app.use('/api/contract', validate, require('./routes/contract'));

// catch 404
app.use((req, res) => {
  const message = 'Not found';
  const status = 404;
  const logFormat = formatter.formatResponseError(req, status, message);
  logger.error(logFormat.details, logFormat.msg);
  res.status(404).json({ status, error: message });
});

// catch errors
app.use((err, req, res) => {
  const message = 'Server error';
  const status = err.status || 500;
  const logFormat = formatter.formatResponseError(req, status, message);
  logger.error(logFormat.details, logFormat.msg);
  res.status(status).json({ status, error: message });
});

module.exports = app;