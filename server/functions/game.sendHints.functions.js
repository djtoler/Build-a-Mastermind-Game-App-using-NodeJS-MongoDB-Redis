const returnSuperEasyHints = require('./game.hints.superEasy')
const returnEasyHints = require('./game.hints.easy')
const returnHardHints = require('./game.hints.hard')
const returnSuperHardHints = require('./game.hints.superHard')

async function returnHintFunctions (theCurrentGamesRandomNumber, mostCurrentUserGuess) {
    return hintFunctions = {
        superEasyHints : await returnSuperEasyHints(4, theCurrentGamesRandomNumber), 
        easyHints : await returnEasyHints(theCurrentGamesRandomNumber, mostCurrentUserGuess), 
        hardHints : await returnHardHints(theCurrentGamesRandomNumber, 3),
        superHardHints : await returnSuperHardHints(theCurrentGamesRandomNumber) 
    }
}

module.exports =  returnHintFunctions