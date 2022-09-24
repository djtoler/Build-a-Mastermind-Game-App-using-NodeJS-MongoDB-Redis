const {updateAdminDataAfterSuccessfulGuessEvaluation} = require('../../functions/game.admin')
const {evaluateGuess} = require("../../functions/event-emitters");
console.log('hey');

const doUpdateGameDataAfterSuccessfulGuess = async () => {
  evaluateGuess.on("updateAdminAfterGuessEvaluation", function (theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults) {
    updateAdminDataAfterSuccessfulGuessEvaluation(theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults);
  })
};

doUpdateGameDataAfterSuccessfulGuess();
module.exports = {doUpdateGameDataAfterSuccessfulGuess}