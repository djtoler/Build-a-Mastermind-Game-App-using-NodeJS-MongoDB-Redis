const {returnDigitCalculations} = require('./game.helpers')

function returnRandomIndex(highestPossibleIndexValue) {
    return Math.floor(Math.random() * highestPossibleIndexValue);
}

async function returnHardHints (theCurrentGamesRandomNumber, exponentForCubedCalculation) {
    let hintEvaluation;
    const digitCalculations = await returnDigitCalculations(theCurrentGamesRandomNumber, exponentForCubedCalculation)
    console.log('digitCalculations', digitCalculations);
    hintEvaluation = { gameMode: "hard", hint: digitCalculations[returnRandomIndex(Object.keys(digitCalculations).length)]};
    console.log('digitCalculations after', digitCalculations);
    return hintEvaluation;
};

module.exports = returnHardHints