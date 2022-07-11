const express = require('express');
const game = express.Router();
const { get_random_number_from_api, get_and_evaluate_user_guess } = require('../../functions/general-game-functions')

game.get('/random-number', (req, res, next) => {
    get_random_number_from_api(req, res);
  })

game.post('/guess-evaluation', (req, res, next) => {
    get_and_evaluate_user_guess(req, res);
  })


  module.exports = game;