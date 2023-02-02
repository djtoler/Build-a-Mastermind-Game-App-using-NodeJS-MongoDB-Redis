const returnHintFunctions = require("./game.sendHints.functions");
const { gameModes } = require("../game-helpers/game.helpers.functions");

async function sendHints(  theCurrentGamesMode,  theCurrentGamesRandomNumber,  mostCurrentUserGuess,  easyHintButtonClickCounter) {
  let hintsToReturnToUser;
  const hintFunctions = returnHintFunctions(  theCurrentGamesMode,  theCurrentGamesRandomNumber,  mostCurrentUserGuess,  easyHintButtonClickCounter);
  console.log(  theCurrentGamesMode,  ",<--- the current games mode from game.sendhints");

  if (theCurrentGamesMode === gameModes.default)    {hintsToReturnToUser = console.log("Game in default mode")}
  if (theCurrentGamesMode === gameModes.superEasy)  {hintsToReturnToUser = (await hintFunctions).superEasyHints}
  if (theCurrentGamesMode === gameModes.easy)       {hintsToReturnToUser = (await hintFunctions).easyHints}
  if (theCurrentGamesMode === gameModes.hard)       {hintsToReturnToUser = (await hintFunctions).hardHints}
  if (theCurrentGamesMode === gameModes.superHard)  {hintsToReturnToUser = (await hintFunctions).superHardHints}
  if (theCurrentGamesMode === gameModes.superHard)  {hintsToReturnToUser = (await hintFunctions).superHardHints}

  // (await theCurrentGamesMode) === gameModes.default
  //   ? (hintsToReturnToUser = console.log("Game in default mode"))
  //     : (await theCurrentGamesMode) === gameModes.superEasy
  //   ? (hintsToReturnToUser = (await hintFunctions).superEasyHints)
  //     : (await theCurrentGamesMode) === gameModes.easy
  //   ? (hintsToReturnToUser = (await hintFunctions).easyHints)
  //     : (await theCurrentGamesMode) === gameModes.hard
  //   ? (hintsToReturnToUser = (await hintFunctions).hardHints)
  //     : (await theCurrentGamesMode) === gameModes.superHard
  //   ? (hintsToReturnToUser = (await hintFunctions).superHardHints)
  //     : (hintsToReturnToUser = `GAME CURRENTLY IN ${gameModes.default} MODE`);

  console.log(theCurrentGamesMode,  ",<--- the current games mode from game.sendhints2");

  return hintsToReturnToUser;
}

module.exports = sendHints;
