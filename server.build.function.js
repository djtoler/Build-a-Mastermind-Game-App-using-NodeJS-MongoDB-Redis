const coordinateServerComponents = require('./server.sequence.components')

function buildServer() {
  const express = require("express");
  const app = express();
  coordinateServerComponents(app);
  return app
}

module.exports = buildServer