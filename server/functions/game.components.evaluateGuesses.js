const businessLogicTemplate = require('./businessLogicTemplate')
const {limitRoundsPerGame, didUserGuessAll4NumbersCorrect} = require('./game.helpers')
const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')

const returnTotalCountOfCorrectNumbers = (guessFromRequestBody, currentRandomNumberFromRequestBody, arrayToStoreCorrectNumbersCount) => {
    
    let totalCountOfCorrectNumbers              = 0
    let arrayCreatedFromEachDigitOfUsersGuess   = Array.from(String(guessFromRequestBody));
    const randomNumberFromRequestBodyToArray    = Array.from(String(currentRandomNumberFromRequestBody));

    arrayToStoreCorrectNumbersCount = 
    arrayCreatedFromEachDigitOfUsersGuess.filter((comparison) => {
        return randomNumberFromRequestBodyToArray.includes(comparison);
    })

    totalCountOfCorrectNumbers = arrayToStoreCorrectNumbersCount.length;
    return totalCountOfCorrectNumbers
};




const returnTotalCountOfCorrectLocations = (guessFromRequestBody, randomNumberFromRequestBody) => {
    let totalCountOfCorrectLocations    = 0;
    let i                               = 0;
    const incorrectLocation             = 0;
    
    while (i < 4) {
        guessFromRequestBody.toString().charAt(i) === randomNumberFromRequestBody.toString().charAt(i)
        ? totalCountOfCorrectLocations++ : incorrectLocation; 
        i++;
    }
    return totalCountOfCorrectLocations;
};


const returnGuessEvaluationObject = async (currentRandomNumberFromRequestBody, guessFromRequestBody) => {
    let guessEvaluationObject;

    const totalCountOfCorrectNumbers = returnTotalCountOfCorrectNumbers(
        currentRandomNumberFromRequestBody,
        guessFromRequestBody
    )

    const totalCountOfCorrectLocations = returnTotalCountOfCorrectLocations(
        currentRandomNumberFromRequestBody,
        guessFromRequestBody
    )

    const finalEvaluation= {
        totalCorrectNumbersCount:       totalCountOfCorrectNumbers,
        totalCorrectLocationsCount:     totalCountOfCorrectLocations,
        guess_attempt_return:           businessLogicTemplate.defaultWrongGuessNumberFromRequestBody,
    }
    console.log(finalEvaluation);
    
    return guessEvaluationObject = {
        totalCorrectNumbersCount:       totalCountOfCorrectNumbers,
        totalCorrectLocationsCount:     totalCountOfCorrectLocations,
        guess_attempt_return:           businessLogicTemplate.defaultWrongGuessNumberFromRequestBody,
    }
}

const setAndReturnCurrentGameVariables = async (currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode) => {
    console.log('in update current game');
    currentDatabase = await currentDatabaseInUse()

    let 
    currentGame =           await currentDatabase.getCurrentGame({ id: currentGamesRequestBodyID}),
    currentUserEmail =      currentGame.userEmail
    currentUser =           await currentDatabase.getUser(currentUserEmail)

    const 
    userReachedRoundsLimit =        await limitRoundsPerGame(currentGame, currentUser),
    userGuessedCorrectAndWon =      await didUserGuessAll4NumbersCorrect(currentRandomNumberFromRequestBody, guessFromRequestBody, currentUser)

    return {
        currentDatabase, currentGame, currentUserEmail, 
        currentUser, userReachedRoundsLimit,
        userGuessedCorrectAndWon
    }
}

module.exports = {
    setAndReturnCurrentGameVariables,
    returnGuessEvaluationObject
}