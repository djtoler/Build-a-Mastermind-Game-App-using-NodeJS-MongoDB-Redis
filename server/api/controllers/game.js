const express = require('express');
const game = express.Router();
const { getRandomNumber } = require('../../functions/general-game-functions')

game.get('/random-number', (req, res, next) => {
      getRandomNumber(req, res);
  })


  module.exports = game;