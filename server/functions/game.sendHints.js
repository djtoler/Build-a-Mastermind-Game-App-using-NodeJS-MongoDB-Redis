const returnHintFunctions = require('./game.sendHints.functions')
const {gameModes} = require('./game.helpers')

async function sendHints (theCurrentGameMode, theCurrentGamesRandomNumber, mostCurrentUserGuess) {
    let hintsToReturnToUser;
    const hintFunctions = returnHintFunctions(theCurrentGamesRandomNumber, mostCurrentUserGuess)

    theCurrentGameMode === gameModes.superEasy 
        ? hintsToReturnToUser = (await hintFunctions).superEasyHints : 
    
    theCurrentGameMode === gameModes.easy 
        ? hintsToReturnToUser = (await hintFunctions).easyHints : 
    
    theCurrentGameMode === gameModes.hard 
        ? hintsToReturnToUser = (await hintFunctions).hardHints :
    
    theCurrentGameMode === gameModes.superHard 
        ? hintsToReturnToUser = (await hintFunctions).superHardHints : 
    
    hintsToReturnToUser = `GAME CURRENTLY IN ${gameModes.default} MODE`

    return hintsToReturnToUser
}

module.exports = sendHints