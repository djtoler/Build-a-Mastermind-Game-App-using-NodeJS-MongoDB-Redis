const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')

const game = require('./server/api/controllers/game')

dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("endpoint is working!"))

app.get('/random-number', game)

app.listen(
    9991,
    console.log(`Server running on port 9991`)
  );