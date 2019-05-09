const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const helmet = require('helmet');
const config = require('./config');
const logger = require('./libs/logger')(config.logger);
const formatter = require('./libs/formatter');
const prometheus = require('./libs/prometheus');

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
    res.status(status).json({ error: err.message });
  };

  next();
});

// enable collection of default metrics
app.use(prometheus.requestCounters);
app.use(prometheus.responseCounters);
prometheus.injectMetricsRoute(app);
prometheus.startCollection();

/*
 * Routes
 */
{{#each @root.swagger.endpoints}}
{{#endsWith @root.swagger.basePath '/'}}
app.use('{{@root.swagger.basePath}}{{..}}', require('./routes/{{..}}'));
{{else}}
app.use('{{@root.swagger.basePath}}/{{..}}', require('./routes/{{..}}'));
{{/endsWith}}
{{/each}}

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
