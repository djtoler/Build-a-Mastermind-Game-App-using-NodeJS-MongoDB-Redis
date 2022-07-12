const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')

const game = require('./server/api/controllers/game');
const connectMongo = require("./server/config/mongodb");

dotenv.config();
connectMongo();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("endpoint is working!"))
app.get('/random-number', game)
app.post('/guess-evaluation', game)

app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );