const {  setAndReturnCurrentGameVariables,  returnGuessEvaluationObject,} = require("./game.features.evaluateGuesses");
const { updateCurrentGameData } = require("../game-helpers/game.helpers.functions");
const createNewGame = require("./game.features.createNewGame");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");

// const { evaluateGuess } = require("../../functions/event-emitters");

const currentGameFunction = async (  currentGamesRequestBodyID,  currentRandomNumberFromRequestBody,  guessFromRequestBody,  theCurrentGamesMode, currentUsersData) => {
  console.log(currentUsersData, '****<<<<-------in game.runGame');
  let currentUser = JSON.parse(currentUsersData).authorizeUser.user
  // let currentGame = currentUser.games[currentUser.games.length - 1]
  console.log(currentUser, "+++++++++++++++++++++++++++");
  const { currentDatabase, userReachedRoundsLimit, userGuessedCorrectAndWon, currentGame } =
    await setAndReturnCurrentGameVariables(currentGamesRequestBodyID,currentRandomNumberFromRequestBody,guessFromRequestBody,theCurrentGamesMode, currentUsersData);
  console.log(currentDatabase, "88888888++++CurrentDB");
  console.log('after first function');



  // let { currentGame, currentUserEmail, currentUser } =
  //   await setAndReturnCurrentGameVariables(  currentGamesRequestBodyID,  currentRandomNumberFromRequestBody,  guessFromRequestBody,  theCurrentGamesMode);


  console.log('after 2 function');

  while (userReachedRoundsLimit === false &&  userGuessedCorrectAndWon === false) {
    console.log("inside while condition");
    const guessEvaluationResults = await returnGuessEvaluationObject(  currentRandomNumberFromRequestBody,  guessFromRequestBody);
    const dataToUpdateCurrentGame = await updateCurrentGameData(currentUser,currentGame,theCurrentGamesMode,guessEvaluationResults,currentRandomNumberFromRequestBody,guessFromRequestBody);
    console.log('<*<<<<<<<<<<*****========dataToUpdateCurrentGame=======>>>>>>>>>', dataToUpdateCurrentGame, '<*<<<<<<<<<<*****===============>>CCCUUU', currentUser);
    
    const updateGameInDB = await currentDatabase.updateGame(dataToUpdateCurrentGame, currentUser)
    // currentGame.gameData.roundsPlayed = currentGame.gameData.roundsPlayed + 1;

    return {  currentGuessEvaluationData: guessEvaluationResults,  currentGameID: currentGame.game,};
  }

  console.log('after 3 function');

  if ((userGuessedCorrectAndWon === true && userReachedRoundsLimit === true) || userGuessedCorrectAndWon === true) {
    currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
    currentUser.alltimeGamesWon = currentUser.alltimeGamesWon + 1;
  }
  console.log('after 4th if');
  if (userReachedRoundsLimit === true) {
    currentUser.alltimeGamesPlayed = currentUser.alltimeGamesPlayed + 1;
  }

  console.log('after 5th if');

  currentGame = await createNewGame(  currentDatabase,  currentUser,  currentUserEmail);
  console.log(currentGame, '<<<<<<<<< ****CurrentGame from game.runGame.functions');
  console.log(  "currentGame.gameData.roundsPlayed ==>",  currentGame.gameData.roundsPlayed);
  // evaluateGuess.emit("update_admin");

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
