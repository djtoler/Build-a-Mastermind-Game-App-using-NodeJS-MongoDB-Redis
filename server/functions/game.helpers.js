const runReturnRandomNumberFromBackup = require('./game.backup')
const returnRandomNumberFromBackup = runReturnRandomNumberFromBackup()
const convertRandomNumber = require('./game.components.convertRandomNumber')
const {evaluateGuess} = require('./event-emitters')

const gameModes = { easy: "easy", superEasy: "superEasy", hard: "hard", superHard: "superHard", default: "default" };
const defaultGameObj = {is2Player: false, gameMode: 'waiting', randomNumber: 0, roundsPlayed: 0, gameWon: false, user: []};

const returnDigitCalculations = async (theCurrentGamesRandomNumber, exponentForCubedCalculation) => {
    return digitCalculations = { 
        0: theCurrentGamesRandomNumber / 2, 
        1: theCurrentGamesRandomNumber * 2, 
        2: Math.pow(theCurrentGamesRandomNumber, exponentForCubedCalculation)
}}

const RANDOM_NUMBER_API_RELIABILITY_MODE = (responseObj) => {
    responseObj = {};
    const randomNumberFromBackup = Number(returnRandomNumberFromBackup);
    Object.assign(responseObj, {success: false, randomNumber: randomNumberFromBackup});
    process.env.RANDOM_NUMBER = responseObj.randomNumber
    return responseObj
}

const returnRandomNumber = async (apiResponse) => {
    let responseObj = {};
    const randomNumber = await convertRandomNumber(apiResponse);
    Object.assign(responseObj, {success: true, randomNumber: randomNumber.randomNumber});
    process.env.RANDOM_NUMBER = responseObj.randomNumber
    return responseObj
}
    
const limitRoundsPerGame = async(currentGame, currentUser) => {
    let runCreateNewGame = false
    if (currentGame.roundsPlayed === 4) {runCreateNewGame = true}
    // console.log('limitRoundsPerGame:==> ', runCreateNewGame);
    return runCreateNewGame
}

const didUserGuessAll4NumbersCorrect = async (currentRandomNumberFromRequestBody, guessFromRequestBody, currentUser) => {
    // console.log('INSIDE DID-USER-GUESS-ALL-4-CORRECT');

    const userGuessedAll4NumbersCorrect =
    await guessFromRequestBody === currentRandomNumberFromRequestBody ? true : false;
    
    // console.log('userGuessedAll4NumbersCorrect: ==>', userGuessedAll4NumbersCorrect, );
    return userGuessedAll4NumbersCorrect;
};

const rankUsers = (arrayOfUsers, lengthOfArray) => {
    let indexValue, currentUser, j;  
    for (indexValue = 1; i < lengthOfArray; indexValue++) {  
        currentUser = arrayOfUsers[indexValue];  
        j = indexValue - 1;  

        while (j >= 0 && arrayOfUsers[j] > currentUser) {  
            arrayOfUsers[j + 1] = arrayOfUsers[j];  
            j = j - 1;  
        }  
        arrayOfUsers[j + 1] = currentUser;  
    }  
}

const updateCurrentGamesUserData = async (currentUser, correctLocationPoints, correctDigitsPoints) => {

    currentUser.alltimePointsEarned = currentUser.alltimePointsEarned + correctLocationPoints + correctDigitsPoints
    currentUser.avgPPG = currentUser.alltimePointsEarned / currentUser.alltimeGamesPlayed
                
    currentUser.ranking = 0
    currentUser.ppgRanking = 0
    currentUser.peRanking = 0
    currentUser.gwRanking = 0
    currentUser.gpRanking = 0
   
    // console.log('USER FROM UPDATE HELPER FUNC --->af',     
    // currentUser.alltimeGamesPlayed,
    // currentUser.alltimeGamesWon,
    // currentUser.alltimePointsEarned,
    // currentUser.avgPPG,
    // currentUser.ranking,
    // currentUser.ppgRanking,
    // currentUser.peRanking,
    // currentUser.gwRanking,
    // currentUser.gpRanking,);
    
    return currentUser
}


const updateCurrentGamesData = async (currentGame, correctLocationPoints, correctDigitsPoints, guessEvaluationResults, currentRandomNumberFromRequestBody) => {  
        
    let newRoundObject = {
        totalCorrectNumbersCount: guessEvaluationResults.totalCorrectNumbersCount,
        totalCorrectLocationsCount: guessEvaluationResults.totalCorrectLocationsCount,
        guessAttempt: guessEvaluationResults.guessAttempt,
        date: new Date(Date.now()).toString()
    }
    currentGame.gameData.totalPoints = currentGame.gameData.totalPoints + correctLocationPoints + correctDigitsPoints;
    currentGame.gameData.guesses.push(newRoundObject)
    // console.log(currentGame.gameData.guesses);
    return currentGame
}


const updateCurrentGameData = async (currentUser, currentGame, theCurrentGamesMode, guessEvaluationResults, currentRandomNumberFromRequestBody, guessFromRequestBody) => {
    let correctLocationPoints;
    let correctDigitsPoints;

    switch (theCurrentGamesMode) {

        case "superEasy":
            correctLocationPoints = 500
            correctDigitsPoints = 1000
            break;

        case "easy":
            correctLocationPoints = 1000
            correctDigitsPoints = 2000
            break;

        case "hard":
            correctLocationPoints = 5000
            correctDigitsPoints = 10000
            break;

        case "superHard":
            correctLocationPoints = 10000
            correctDigitsPoints = 20000
            break;

        default:
            correctLocationPoints = 2000
            correctDigitsPoints = 4000
            break;
    }

    correctDigitsPoints = correctDigitsPoints * guessEvaluationResults.totalCorrectNumbersCount
    correctLocationPoints = correctLocationPoints * guessEvaluationResults.totalCorrectLocationsCount

    await updateCurrentGamesUserData(currentUser, correctLocationPoints, correctDigitsPoints)
    await updateCurrentGamesData(currentGame, correctLocationPoints, correctDigitsPoints, guessEvaluationResults, theCurrentGamesMode, currentRandomNumberFromRequestBody)
    
    // console.log('helping guess event!!!!: ', theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults);
    
    evaluateGuess.emit("updateAdminAfterGuessEvaluation", theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults);
}

module.exports = {
    RANDOM_NUMBER_API_RELIABILITY_MODE,
    returnRandomNumber,
    returnDigitCalculations,
    defaultGameObj,
    gameModes,
    updateCurrentGamesUserData,
    updateCurrentGamesData,
    limitRoundsPerGame,
    didUserGuessAll4NumbersCorrect,
    updateCurrentGameData,
    rankUsers
}













// async function generateHintKeys (hintKey, hintKeyNumber, arrayUsedAsCachedKeyStringValue, arrayOfHintKeysGeneratedFromWhileLoop = [], i=0) {
//     arrayOfHintKeysGeneratedFromWhileLoop.push(`${hintKey}${hintKeyNumber}` = await client.get(arrayUsedAsCachedKeyStringValue[i])) 
//     i++
// }





