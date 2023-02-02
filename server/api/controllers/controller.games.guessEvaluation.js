const asyncHandler = require("express-async-handler");
const runGame = require('../../functions/game-features/game.runGame')

const runPlayGameService = asyncHandler(async (req, res) => {
    const {currentGuess, currentGameID, currentGameMode, currentRandomNumberFromRequestBody, currentUsersData} = req.body
    console.log(req.body, '<<<<------->>>> request body &&&&&&&&&&&---->', currentUsersData);
    const runCurrentGameFunction = await runGame(currentGameID, currentRandomNumberFromRequestBody, currentGuess, currentGameMode, currentUsersData);
    console.log('************************************************************');
    console.log(runCurrentGameFunction, '<<<<------->>>> runCurrentGameFunction');
    res.json(runCurrentGameFunction)
});

module.exports = runPlayGameService