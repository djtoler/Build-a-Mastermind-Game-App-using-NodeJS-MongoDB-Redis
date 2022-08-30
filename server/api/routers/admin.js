const admin = require('../routes/admin')

module.exports = app => app.use('/admin', admin)