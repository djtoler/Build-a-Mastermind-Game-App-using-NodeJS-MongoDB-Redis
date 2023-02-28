const {  setAndReturnCurrentGameVariables,  returnGuessEvaluationObject,} = require("./game.features.evaluateGuesses");
const { updateCurrentGameData } = require("../game-helpers/game.helpers.functions");
const createNewGame = require("./game.features.createNewGame");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");

// const { evaluateGuess } = require("../../functions/event-emitters");

const currentGameFunction = async (  currentGamesRequestBodyID,  currentRandomNumberFromRequestBody,  guessFromRequestBody,  theCurrentGamesMode, currentUsersData) => {
  let currentUser = JSON.parse(currentUsersData).authorizeUser.user
  const { currentDatabase, userReachedRoundsLimit, userGuessedCorrectAndWon, currentGame } =
    await setAndReturnCurrentGameVariables(currentGamesRequestBodyID,currentRandomNumberFromRequestBody,guessFromRequestBody,theCurrentGamesMode, currentUsersData);

  while (userReachedRoundsLimit === false &&  userGuessedCorrectAndWon === false) {
    const guessEvaluationResults = await returnGuessEvaluationObject(  currentRandomNumberFromRequestBody,  guessFromRequestBody);
    const dataToUpdateCurrentGame = await updateCurrentGameData(currentUser,currentGame,theCurrentGamesMode,guessEvaluationResults,currentRandomNumberFromRequestBody,guessFromRequestBody);

    const updateGameInDB = await currentDatabase.updateGame(dataToUpdateCurrentGame, currentUser)
    return {  currentGuessEvaluationData: guessEvaluationResults,  currentGameID: currentGame.game,};
  }

  if ((userGuessedCorrectAndWon === true && userReachedRoundsLimit === true) || userGuessedCorrectAndWon === true) {
    currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
    currentUser.alltimeGamesWon = currentUser.alltimeGamesWon + 1;
  }

  if (userReachedRoundsLimit === true) {
    currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
  }

  return {
    currentGuessEvaluationData: await returnGuessEvaluationObject(  currentRandomNumberFromRequestBody,  guessFromRequestBody),
    currentGameID: currentGame.gameProfile.gameID,
  };
};

// currentGameFunction(
//   businessLogicTemplate.defaultGameFromRequestBodyID,
//   businessLogicTemplate.defaultCurrentRandomNumberFromRequestBody,
//   businessLogicTemplate.defaultWrongGuessNumberFromRequestBody,
//   businessLogicTemplate.defaultCurrentModeFromRequestBody
// );

module.exports = currentGameFunction;
