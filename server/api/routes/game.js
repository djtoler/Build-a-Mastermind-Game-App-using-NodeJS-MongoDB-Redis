const express = require('express');
const game = express.Router();
const { get_random_number_from_api, get_and_evaluate_user_guess, send_hint_data, create_a_new_game} = require('../../functions/general-game-functions');
const {reset_easy_hint_numbers} = require('../../functions/game-mode-functions');

game.get('/random-number', (req, res, next) => {
  get_random_number_from_api(req, res);
})

game.post('/create-game', (req, res) => {
  create_a_new_game(req, res);
})

game.post('/guess-evaluation', (req, res, next) => {
  get_and_evaluate_user_guess(req, res);
})

game.post('/get-hints', (req, res, next) => {
  send_hint_data(req, res)
})

game.put('/update-vars', (req, res, next) => {
  reset_easy_hint_numbers(req);
})

module.exports = game;