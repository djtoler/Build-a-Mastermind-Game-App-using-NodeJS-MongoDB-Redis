const {setAndReturnCurrentGameVariables, returnGuessEvaluationObject} = require('./game.components.evaluateGuesses')
const businessLogicTemplate = require('./businessLogicTemplate')
const {updateCurrentGameData} = require('./game.helpers')
const createNewGame = require('./game.components.createNewGame')
// const { evaluateGuess } = require("../../functions/event-emitters");


const currentGameFunction = async (currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode) => {
    const { currentDatabase, userReachedRoundsLimit, userGuessedCorrectAndWon} = await setAndReturnCurrentGameVariables(currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode)
    let {currentGame, currentUserEmail, currentUser} = await setAndReturnCurrentGameVariables(currentGamesRequestBodyID, currentRandomNumberFromRequestBody, guessFromRequestBody, theCurrentGamesMode)
    
    while (userReachedRoundsLimit === false && userGuessedCorrectAndWon === false) {
        console.log('inside while condition');
        const guessEvaluationResults = await returnGuessEvaluationObject(currentRandomNumberFromRequestBody, guessFromRequestBody)
        await updateCurrentGameData(currentUser, currentGame, theCurrentGamesMode, guessEvaluationResults, currentRandomNumberFromRequestBody, guessFromRequestBody)               
        currentGame.gameData.roundsPlayed = currentGame.gameData.roundsPlayed + 1
        return {currentGuessEvaluationData: guessEvaluationResults, currentGameID: currentGame.game }
    }

    if ((userGuessedCorrectAndWon === true && userReachedRoundsLimit === true) || userGuessedCorrectAndWon === true ) {
        currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
        currentUser.alltimeGamesWon = currentUser.alltimeGamesWon + 1
    }
    
    if (userReachedRoundsLimit === true) {
        currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
    }
    
    currentGame = await createNewGame(currentDatabase, currentUser, currentUserEmail)
    console.log('currentGame.gameData.roundsPlayed ==>', currentGame.gameData.roundsPlayed);
    // evaluateGuess.emit("update_admin");
    
    return {currentGuessEvaluationData: await returnGuessEvaluationObject(currentRandomNumberFromRequestBody, guessFromRequestBody), currentGameID: currentGame.gameProfile.gameID}    
}

currentGameFunction(
    businessLogicTemplate.defaultGameFromRequestBodyID,
    businessLogicTemplate.defaultCurrentRandomNumberFromRequestBody,
    businessLogicTemplate.defaultWrongGuessNumberFromRequestBody,
    businessLogicTemplate.defaultCurrentModeFromRequestBody
)

module.exports = currentGameFunction

