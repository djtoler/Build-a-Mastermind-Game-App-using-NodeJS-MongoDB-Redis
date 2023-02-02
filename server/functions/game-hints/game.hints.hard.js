const {
  returnDigitCalculations,
} = require("../game-helpers/game.helpers.functions");

function returnRandomIndex(highestPossibleIndexValue) {
  return Math.floor(Math.random() * highestPossibleIndexValue);
}

async function returnHardHints(
  theCurrentGamesRandomNumber,
  exponentForCubedCalculation
) {
  let hintEvaluation;
  const digitCalculations = await returnDigitCalculations(
    theCurrentGamesRandomNumber,
    exponentForCubedCalculation
  );
  hintEvaluation = {
    gameMode: "hard",
    hint: digitCalculations[
      returnRandomIndex(Object.keys(digitCalculations).length)
    ],
  };
  return hintEvaluation;
}

module.exports = returnHardHints;
