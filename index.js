function app (database) {
  const express = require("express");
  const app = express();

  const modules = require('./server/app/modules-index/module-index')
  const middlewares = require('./server/middlewares/middlewares-index/middleware-index');
  
  modules.forEach(module => eval(module));
  middlewares.forEach(middleware => require(`./server/middlewares/middleware/${middleware}`)(app))
  
  app.get('/', (req, res) => res.send("endpoint is working!"))
  app.use('/admin', admin)
  app.use('/user', users);
  app.use('/game', game)
  app.use('/', image)

  return app
}

module.exports = app
