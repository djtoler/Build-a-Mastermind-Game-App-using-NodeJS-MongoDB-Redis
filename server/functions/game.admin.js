const {updatePointsAndCounts, updateGamesPlayedByMode, updateEvaluateGuessTimer} = require('./game.admin.helpers')

const updateAdminDataAfterSuccessfulGuessEvaluation = async (theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults) => {
    updatePointsAndCounts       (theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults)
    updateGamesPlayedByMode     (theCurrentGamesMode)
    updateEvaluateGuessTimer    ()
}

module.exports = {
    updateAdminDataAfterSuccessfulGuessEvaluation
}