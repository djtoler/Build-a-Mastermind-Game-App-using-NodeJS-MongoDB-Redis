// const db = require('../dbs')
const makeApp = require('./index')
const configs = require('./server/config/configs')
configs.forEach(config => eval(config))

const app = makeApp(connectMongo())

app.listen( 9991, ()=> console.log("YOU ARE NOW LISTENING ON PORT 9991"))