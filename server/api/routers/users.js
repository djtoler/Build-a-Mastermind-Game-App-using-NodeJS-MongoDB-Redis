const users = require('../routes/users')

module.exports = app => app.use('/user', users)
