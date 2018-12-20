const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('./config')
const logger = require('./libs/logger')

const log = logger(config.logger)
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

/*
 * Routes
 */
{{#each @root.swagger.endpoints}}
{{#endsWith @root.swagger.basePath '/'}}
app.use('{{@root.swagger.basePath}}{{..}}', require('./controllers/{{..}}'))
{{else}}
app.use('{{@root.swagger.basePath}}/{{..}}', require('./controllers/{{..}}'))
{{/endsWith}}
{{/each}}

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`)
  res.status(404).send({ status: 404, error: 'Not found' })
})

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500
  log.error(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`)
  res.status(status).send({ status, error: 'Server error' })
})

module.exports = app
