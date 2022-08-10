const user = require('../routes/game')

module.exports = app => {

    app.use('/user', user)

}