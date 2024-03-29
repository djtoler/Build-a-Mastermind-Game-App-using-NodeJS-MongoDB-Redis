const businessLogicTemplate = require("../../tests/test.template");
const {  limitRoundsPerGame,  didUserGuessAll4NumbersCorrect,} = require("../game-helpers/game.helpers.functions");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");

const returnTotalCountOfCorrectNumbers = (  guessFromRequestBody,  currentRandomNumberFromRequestBody,  arrayToStoreCorrectNumbersCount) => {
  let totalCountOfCorrectNumbers = 0;
  let arrayCreatedFromEachDigitOfUsersGuess = Array.from(  String(guessFromRequestBody));
  const randomNumberFromRequestBodyToArray = Array.from(  String(currentRandomNumberFromRequestBody));
  arrayToStoreCorrectNumbersCount = arrayCreatedFromEachDigitOfUsersGuess.filter((comparison) => {  
    return randomNumberFromRequestBodyToArray.includes(comparison);
  });
  totalCountOfCorrectNumbers = arrayToStoreCorrectNumbersCount.length;
  return totalCountOfCorrectNumbers;
};

const returnTotalCountOfCorrectLocations = (  guessFromRequestBody,  randomNumberFromRequestBody) => {
  let totalCountOfCorrectLocations = 0;
  let i = 0;
  const incorrectLocation = 0;
  while (i < 4) {guessFromRequestBody.toString().charAt(i) ===
    randomNumberFromRequestBody.toString().charAt(i)
      ? totalCountOfCorrectLocations++
      : incorrectLocation;
    i++;
  }
  return totalCountOfCorrectLocations;
};

const returnGuessEvaluationObject = async (  currentRandomNumberFromRequestBody,  guessFromRequestBody) => {
  let guessEvaluationObject;
  const totalCountOfCorrectNumbers = returnTotalCountOfCorrectNumbers(  currentRandomNumberFromRequestBody,  guessFromRequestBody);
  const totalCountOfCorrectLocations = returnTotalCountOfCorrectLocations(  currentRandomNumberFromRequestBody,  guessFromRequestBody);
  return (guessEvaluationObject = {  
    totalCorrectNumbersCount: totalCountOfCorrectNumbers,  
    totalCorrectLocationsCount: totalCountOfCorrectLocations,  
    guessAttempt: guessFromRequestBody
  });
};

const setAndReturnCurrentGameVariables = async (  currentGamesRequestBodyID,  currentRandomNumberFromRequestBody,  guessFromRequestBody,  theCurrentGamesMode, currentUsersData) => {
  let currentDatabase   = await currentDatabaseInUse();
  let currentUser = JSON.parse(currentUsersData).authorizeUser.user
  let userEmail = JSON.parse(currentUsersData).authorizeUser.user.email
  let currentGame       = await currentDatabase.getCurrentGame(userEmail);
  const userReachedRoundsLimit = await limitRoundsPerGame(  currentGame,  currentUser)
  const userGuessedCorrectAndWon = await didUserGuessAll4NumbersCorrect(  currentRandomNumberFromRequestBody,  guessFromRequestBody,  currentUser);
  return {  currentDatabase,  currentGame,  userEmail,  currentUser,  userReachedRoundsLimit,  userGuessedCorrectAndWon,};
};

module.exports = {
  setAndReturnCurrentGameVariables,
  returnGuessEvaluationObject,
};
