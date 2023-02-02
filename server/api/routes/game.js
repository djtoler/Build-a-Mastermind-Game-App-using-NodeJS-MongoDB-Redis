const express = require("express");
const game = express.Router();
const {
  runGetRandomNumberFromAPIService,
  get_and_evaluate_user_guess,
  send_hint_data,
  create_a_new_game,
} = require("../../functions/game-features/general-game-functions");
const runSendHintsService = require("../controllers/controller.game.sendHints");
const runPlayGameService = require("../controllers/controller.games.guessEvaluation");
const runCreateNewGameService = require("../controllers/controller.games.createGame");
const resetEasyHintNumbers = require("../controllers/controller.game.resetEasyHintNumbers");

game.get("/random-number", runGetRandomNumberFromAPIService);
game.post("/get-hints", runSendHintsService);
game.post("/create-game", runCreateNewGameService);
game.post("/guess-evaluation", runPlayGameService);
game.put("/update-vars", resetEasyHintNumbers);

module.exports = game;
