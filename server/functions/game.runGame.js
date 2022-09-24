const currentGameFunction = require('./game.runGame.functions')

async function runGame (currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode) {
    return await currentGameFunction(currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode)
}

module.exports = runGame
