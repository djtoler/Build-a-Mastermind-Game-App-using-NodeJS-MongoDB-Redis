const asyncHandler = require("express-async-handler");
const runGame = require('../../functions/game.runGame')

const runPlayGameService = asyncHandler(async (req, res) => {
    const {currentGuess, currentGameID, currentGameMode, currentRandomNumberFromRequestBody} = req.body
    console.log(req.body, '<<<<------- request body');
    const runCurrentGameFunction = await runGame(currentGameID, currentRandomNumberFromRequestBody, currentGuess, currentGameMode)
    res.json(runCurrentGameFunction)
});

module.exports = runPlayGameService