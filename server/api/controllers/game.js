const express = require('express');
const game = express.Router();
const { get_random_number_from_api, get_and_evaluate_user_guess, send_hint_data, recieve_update_server_variables} = require('../../functions/general-game-functions')
game.get('/random-number', (req, res, next) => {
    get_random_number_from_api(req, res);
  })

game.post('/guess-evaluation', (req, res, next) => {
    get_and_evaluate_user_guess(req, res);
  })

game.post('/get-hints', (req, res, next) => {
  send_hint_data(req, res)
})

// game.post('/update-vars', (req, res, next) => {
//   recieve_update_server_variables(hi_num, low_num)
// })

module.exports = game;