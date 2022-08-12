const components = require('./server.collect.components')

const coordinateServerComponents = (app) => {
    components.modules.forEach((module) => eval(module));
    components.middlewares.forEach((middleware) => require(`./server/middlewares/middleware/${middleware}`)(app));
    components.routers.forEach((router) => require(`./server/api/routers/${router}`)(app));
    return app
}

module.exports = coordinateServerComponents