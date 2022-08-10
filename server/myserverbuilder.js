const mymodules = require('../server/middlewares/middlewares-index/middleware-index')
const MyServer = require('./myserver')


const buildServer = () => {

    const useModules = () => {

    };

    const useMiddlewares = (app) => {
        let middlewares = require('./middlewares/middlewares-index/middleware-index');
        middlewares.forEach(middleware => require(`./middlewares/middleware/${middleware}`)(app))
        // console.log(m);
        return middlewares
    };

    const useRouters = (app) => {
        let routers = require('./api/routers/routers-index');
        routers.forEach(router => require(`./api/routers/${router}`)(app))
        console.log('from routers', routers);
        
        return routers
    }

    const build = () => {
        return new MyServer(useModules, useMiddlewares, useRouters)
    }
}



module.exports = buildServer