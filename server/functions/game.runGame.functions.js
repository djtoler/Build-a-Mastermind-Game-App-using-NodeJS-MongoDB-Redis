const limitRoundsPerGameAndCreateNewGameWhenLimitIsReached = require('./game.limitRoundsPerGame')
const returnGuessEvaluationObject = require('./game.components.evaluateGuesses')
const {defaultCurrentRandomNumberFromRequestBody, defaultGameFromRequestBodyID, defaultCorrectGuessNumber, defaultWrongGuessNumberFromRequestBody, defaultRandomNumberOptions} = require('./businessLogicTemplate')
const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')


const updateAndReturnTheGameThatsCurrentlyInUse = async (currentGamesRequestBodyID, currentRandomNumberFromRequestBody) => {
    // currentGamesRequestBodyID = defaultGameFromRequestBodyID
    const currentDatabase = await currentDatabaseInUse()
    currentGame = await currentDatabase.getCurrentGame({ id: currentGamesRequestBodyID});
    
    console.log('CURRENT GAME ROUNDS PLAYED: ==>', currentGame.roundsPlayed);
    currentGame.roundsPlayed = currentGame.roundsPlayed + 1
    console.log('CURRENT GAME ROUNDS PLAYED AFTER: ==>', currentGame.roundsPlayed);
    currentGame.randomNumber = currentRandomNumberFromRequestBody;
    console.log(currentGame);
    return currentGame
}

updateAndReturnTheGameThatsCurrentlyInUse(defaultGameFromRequestBodyID, defaultCurrentRandomNumberFromRequestBody)












// const didUserGuessAll4NumbersCorrect = async (userGuessedAll4NumbersCorrect, guessFromRequestBody, currentRandomNumberFromRequestBody, currentGame) => {
//     guessFromRequestBody = defaultWrongGuessNumberFromRequestBody
//     currentRandomNumberFromRequestBody = defaultCurrentRandomNumberFromRequestBody

//     userGuessedAll4NumbersCorrect =
//     defaultWrongGuessNumberFromRequestBody == currentRandomNumberFromRequestBody ? true : false;

//     if (userGuessedAll4NumbersCorrect) {
//         currentGame = await returnTheGameThatsCurrentlyInUse()
//         const confirmedCurrentUser = await currentDatabase.getUser(currentGame.users[0])
        
//         confirmedCurrentUser.alltime_games_won = confirmedCurrentUser.alltime_games_won + 1;
//         currentGame.game_won = true;
//         currentGame.total_points = 20000;
//         currentGame.total_correct_locations = 4;
//         currentGame.total_correct_numbers = 4;
//     }
//     return userGuessedAll4NumbersCorrect;
// };

module.exports = updateAndReturnTheGameThatsCurrentlyInUse
