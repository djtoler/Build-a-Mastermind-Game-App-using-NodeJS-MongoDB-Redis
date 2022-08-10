const admin = require('../routes/game')

module.exports = app => {

    app.use('/admin', admin)

}