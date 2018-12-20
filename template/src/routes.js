const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const config = require('./config')
const logger = require('./libs/logger')
const validate = require('./middlewares/validate')

const log = logger(config.logger)
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())

app.use((req, res, next) => {
  res.responseSuccess = (status, data) => {
    log.debug('success')
    res.status(status).json(data)
  }

  res.responseError = (err) => {
    const status = err.code || 500
    log.error(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`)
    res.status(status).json({ status, error: err.message })
  }

  next()
})

/*
 * Routes
 */
{{#each @root.swagger.endpoints}}
{{#endsWith @root.swagger.basePath '/'}}
app.use('{{@root.swagger.basePath}}{{..}}', validate, require('./controllers/{{..}}'))
{{else}}
app.use('{{@root.swagger.basePath}}/{{..}}', validate, require('./controllers/{{..}}'))
{{/endsWith}}
{{/each}}

// catch 404
app.use((req, res) => {
  log.error(`Error 404 on ${req.url}.`)
  res.status(404).json({ status: 404, error: 'Not found' })
})

// catch errors
app.use((err, req, res) => {
  const status = err.status || 500
  log.error(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`)
  res.status(status).json({ status, error: 'Server error' })
})

module.exports = app
