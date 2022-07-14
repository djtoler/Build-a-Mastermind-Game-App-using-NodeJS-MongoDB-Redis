const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const game = require('./server/api/controllers/game');
const connectMongo = require("./server/config/mongodb");
const redis = require('redis')
// const connectRedis = require("./server/config/redis");

dotenv.config();
connectMongo();
// connectRedis();
// connectRedisForImages();

const redisImageConnection = redis.createClient ({ 
  host: '127.0.0.1', 
  port: 6379,
  return_buffers : true 
})

redisImageConnection.on('connect', function name() {
  console.log('Redis for pics connected ' + host + ":" + port);
})

redisImageConnection.on("error", function (err) {
  console.log("Error " + err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("endpoint is working!"))
app.get('/random-number', game)
app.post('/guess-evaluation', game)
app.post('/get-hints', game)
app.put('/update-vars', game)

app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );