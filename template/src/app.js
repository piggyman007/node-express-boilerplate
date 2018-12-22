const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const helmet = require('helmet');
const config = require('./config');
const logger = require('./libs/logger')(config.logger);
const validate = require('./middlewares/validate');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  req.uuid = uuidv1();

  res.responseSuccess = (status, data) => {
    logger.info({ uuid: req.uuid, method: req.method, url: req.originalUrl }, `Success ${status}`);
    res.status(status).json(data);
  };

  res.responseError = (err) => {
    const status = err.code || 500;
    logger.error({ uuid: req.uuid, method: req.method, url: req.originalUrl }, `Error ${status} (${err.message}) with payload ${req.body}.`);
    res.status(status).json({ status, error: err.message });
  };

  next();
});

/*
 * Routes
 */
{{#each @root.swagger.endpoints}}
{{#endsWith @root.swagger.basePath '/'}}
app.use('{{@root.swagger.basePath}}{{..}}', validate, require('./routes/{{..}}'));
{{else}}
app.use('{{@root.swagger.basePath}}/{{..}}', validate, require('./routes/{{..}}'));
{{/endsWith}}
{{/each}}

// catch 404
app.use((req, res) => {
  logger.error({ uuid: req.uuid, method: req.method, url: req.originalUrl }, `Error 404 on ${req.originalUrl}.`);
  res.status(404).json({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res) => {
  const status = err.status || 500;
  logger.error({ uuid: req.uuid, method: req.method, url: req.originalUrl }, `Error ${status} (${err.message}) with payload ${req.body}.`);
  res.status(status).json({ status, error: 'Server error' });
});

module.exports = app;
