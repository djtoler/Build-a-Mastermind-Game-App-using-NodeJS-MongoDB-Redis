const game = require('../routes/game')

module.exports = app => app.use('/game', game)