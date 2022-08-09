const express = require("express");
const dotenv = require("dotenv");
const app = express();
// const cors = require("cors");
// const bodyParser = require('body-parser')
// const {useMiddlewares} = require('./server/middlewares/middlewares-index/middleware-index')
// useMiddlewares();
const game = require('./server/api/routes/game');
const users = require('./server/api/routes/user');
const image = require('./server/config/image')
const admin = require('./server/api/routes/admin');
const connectMongo = require("./server/config/mongodb");
const cloudinary = require("./server/config/cloudinary");



dotenv.config();
connectMongo();

const middlewares = require('./server/middlewares/middlewares-index/middleware-index');
middlewares.forEach(middleware => require(`./server/middlewares/middleware/${middleware}`)(app))

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(cors());
// app.use(express.json());

app.get('/', (req, res) => res.send("endpoint is working!"))
app.use('/admin', admin)
app.use('/user', users);
app.use('/game', game)
app.use('/', image)



app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );

