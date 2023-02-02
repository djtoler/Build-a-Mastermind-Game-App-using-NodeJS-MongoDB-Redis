const buildServer = require('./server.build.function')

function app (database) {
  const server = buildServer()
  return server
}

module.exports = app
