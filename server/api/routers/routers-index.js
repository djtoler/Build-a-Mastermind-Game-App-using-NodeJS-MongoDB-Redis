
const routers = [
    app.use('/admin', admin),
    app.use('/user', users),
    app.use('/game', game),
    app.use('/', image)
  ]

module.exports =  routers

