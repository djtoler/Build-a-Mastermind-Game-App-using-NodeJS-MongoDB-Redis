const express = require('express');
const game = express.Router();
const { getRandomNumberFromAPI, get_and_evaluate_user_guess, send_hint_data, create_a_new_game} = require('../../functions/general-game-functions');
const sendHints = require('../../functions/game.sendHints')
const {reset_easy_hint_numbers} = require('../../functions/game-mode-functions');

game.get('/random-number', getRandomNumberFromAPI)

game.post('/create-game', (req, res) => {
  create_a_new_game(req, res);
})

game.post('/guess-evaluation', (req, res, next) => {
  get_and_evaluate_user_guess(req, res);
})

game.post('/get-hints', async (req, res, next) => {
  console.log('in hints route', req.body);

  const {theCurrentGamesMode, theCurrentGamesRandomNumber} = req.body
  const runSendHints = await sendHints(theCurrentGamesMode, theCurrentGamesRandomNumber)
  res.json(runSendHints)
  


})

game.put('/update-vars', (req, res, next) => {
  reset_easy_hint_numbers(req);
})

module.exports = game;