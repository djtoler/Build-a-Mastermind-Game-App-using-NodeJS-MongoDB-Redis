const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const game = require('./server/api/controllers/game');
const image = require('./server/config/image')
const connectMongo = require("./server/config/mongodb");

// const redis = require('redis')
// const connectRedis = require("./server/config/redis");

dotenv.config();
connectMongo();
// connectRedis();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("endpoint is working!"))
app.get('/random-number', game)
app.post('/guess-evaluation', game)
app.post('/get-hints', game)
app.put('/update-vars', game)
app.post('/upload-photo', image)
app.get('/get_super_easy_hint', image)

app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );