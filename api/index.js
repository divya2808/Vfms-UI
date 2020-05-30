const express = require('express')
const send = require('send')

const app = express()

const routes = require('./routes.js')

app.use(routes)

module.exports = {
  path: '/api',
  handler: app
}

