const currentGameFunction = require('./game.runGame.functions')

async function runGame (currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode, currentUsersData) {
    console.log('in runGame');
    console.log(currentUsersData, "<<<<---- current userdata from game.runGame");
    console.log(currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode);
    return await currentGameFunction(currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode, currentUsersData)
}

module.exports = runGame
