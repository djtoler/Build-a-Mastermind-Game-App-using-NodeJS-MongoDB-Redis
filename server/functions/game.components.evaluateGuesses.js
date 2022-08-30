const runGetRandomNumber = require('./game.components.getRandomNumber')
const NewGameBuilder = require('./game.class')
const {defaultGameObj} = require('./game.helpers')
const { v4: uuidv4 } = require("uuid");
const gameID = uuidv4()

const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')

const updateAndReturnTheGameThatsCurrentlyInUse = async (currentGame, currentGamesRequestBodyID, currentRandomNumberFromRequestBody) => {
    currentDatabase = await currentDatabaseInUse()
    currentGame = await currentDatabase.getCurrentGame({ id: currentGamesRequestBodyID});
    
    totalRoundsPlayedDuringCurrentGame = currentGame.roundsPlayed + 1
    randomNumberOfTheCurrentGame = currentRandomNumberFromRequestBody;
    return currentGame
}

const didUserGuessAll4NumbersCorrect = async (userGuessedAll4NumbersCorrect, guessFromRequestBody, currentRandomNumberFromRequestBody, currentGame) => {
    guessFromRequestBody = guess
    userGuessedAll4NumbersCorrect =
    guess == currentRandomNumberFromRequestBody.toString() ? true : false;

    if (userGuessedAll4NumbersCorrect) {
        currentGame = await returnTheGameThatsCurrentlyInUse()
        const confirmedCurrentUser = await currentDatabase.getUser(currentGame.users[0])
        
        confirmedCurrentUser.alltime_games_won = confirmedCurrentUser.alltime_games_won + 1;
        currentGame.game_won = true;
        currentGame.total_points = 20000;
        currentGame.total_correct_locations = 4;
        currentGame.total_correct_numbers = 4;
    }
    return userGuessedAll4NumbersCorrect;
};

const returnTotalCountOfCorrectNumbers = (guessFromRequestBody, arrayToStoreCorrectNumbersCount, currentRandomNumberFromRequestBody) => {
    let totalCountOfCorrectNumbers = 0;
    let arrayCreatedFromEachDigitOfUsersGuess = Array.from(guessFromRequestBody);
    const randomNumberFromRequestBodyToArray = Array.from(String(currentRandomNumberFromRequestBody));

    console.log(
      (arrayToStoreCorrectNumbersCount =
        arrayCreatedFromEachDigitOfUsersGuess.filter((comparison) => {
          return randomNumberFromRequestBodyToArray.includes(comparison);
        }))
    );
    totalCountOfCorrectNumbers = arrayToStoreCorrectNumbersCount.length;
    return totalCountOfCorrectNumbers
  };

const returnTotalCountOfCorrectLocations = (guessFromRequestBody, randomNumberFromRequestBodyString) => {
    let totalCountOfCorrectLocations = 0;
    let i = 0;
    while (i < 4) {
        guessFromRequestBody.toString().charAt(i) == randomNumberFromRequestBodyString.charAt(i)
        ? totalCountOfCorrectLocations++ : 0; i++;
    }
    return totalCountOfCorrectLocations;
};

const returnGuessEvaluationObject = (guessEvaluationObject) => {
    const userGuessedAll4NumbersCorrect = didUserGuessAll4NumbersCorrect();
    if (userGuessedAll4NumbersCorrect === true) { return guessEvaluationObject = { guess_attempt_return: guessFromRequestBody, all_four_correct: true }}
    
    const totalCountOfCorrectNumbers = returnTotalCountOfCorrectNumbers()
    const totalCountOfCorrectLocations = returnTotalCountOfCorrectLocations()
    
    return guessEvaluationObject = {
        correct_numbers_return: totalCountOfCorrectNumbers,
        correct_locations_return: totalCountOfCorrectLocations,
        guess_attempt_return: guess,
        currentGameID: currentGame._id
    }
}

module.exports = {
    updateAndReturnTheGameThatsCurrentlyInUse,
    didUserGuessAll4NumbersCorrect,
    returnTotalCountOfCorrectNumbers,
    returnTotalCountOfCorrectLocations,
    returnGuessEvaluationObject,
}