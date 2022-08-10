// const app = require('../../../index');
const bodyParser = require('body-parser');


module.exports = function (app) {
    console.log('bp');
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    console.log('end of bp');
}
