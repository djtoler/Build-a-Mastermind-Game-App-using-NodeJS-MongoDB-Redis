const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const game = require('./server/api/routes/game');
const users = require('./server/api/routes/user');
const image = require('./server/config/image')
const admin = require('./server/api/routes/admin');
const connectMongo = require("./server/config/mongodb");
const cloudinary = require("./server/config/cloudinary");


dotenv.config();
connectMongo();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json());

app.use('/admin', admin)
app.get('/', (req, res) => res.send("endpoint is working!"))
app.use('/user', users);
app.get('/random-number', game)
app.post('/guess-evaluation', game)
app.post('/get-hints', game)
app.put('/update-vars', game)
app.post('/upload-photo', image)
app.get('/get_super_easy_hint', image)
app.post('/create-game', game)

app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );