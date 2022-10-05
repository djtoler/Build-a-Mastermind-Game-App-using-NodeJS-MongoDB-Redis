// const returnSuperEasyHints = require('./game.hints.superEasy')
const returnEasyHints = require('./game.hints.easy')
const returnHardHints = require('./game.hints.hard')
const returnSuperHardHints = require('./game.hints.superHard')

async function returnHintFunctions (theCurrentGamesMode, theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter) {
    console.log(theCurrentGamesMode, ',<--- the current games mode from game.sendhints.functions');

    const defaultHint = 'game in default mode from game.sendhints.functions'
    // const superEasy = await returnSuperEasyHints(4, theCurrentGamesRandomNumber)
    const easy = await returnEasyHints(theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter)
    const hard = await returnHardHints(theCurrentGamesRandomNumber, 3)
    const superHard = await returnSuperHardHints(theCurrentGamesRandomNumber) 

    return hintFunctions = {
        default: defaultHint,
        // superEasyHints : superEasy,
        easyHints : easy,
        hardHints : hard,
        superHardHints : superHard 
    }
}



module.exports =  returnHintFunctions