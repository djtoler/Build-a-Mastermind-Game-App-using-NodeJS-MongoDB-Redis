const returnHintFunctions = require('./game.sendHints.functions')
const {gameModes} = require('./game.helpers')

async function sendHints (theCurrentGamesMode, theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter) {
    let hintsToReturnToUser;
    const hintFunctions = returnHintFunctions(theCurrentGamesMode, theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter)
    console.log(theCurrentGamesMode, ',<--- the current games mode from game.sendhints');
    
    await theCurrentGamesMode === gameModes.default
    ? hintsToReturnToUser = console.log('Game in default mode') : 

    await theCurrentGamesMode === gameModes.superEasy 
        ? hintsToReturnToUser = (await hintFunctions).superEasyHints : 
    
    await theCurrentGamesMode === gameModes.easy 
        ? hintsToReturnToUser = (await hintFunctions).easyHints : 
    
    await theCurrentGamesMode === gameModes.hard 
        ? hintsToReturnToUser = (await hintFunctions).hardHints :
    
    await theCurrentGamesMode === gameModes.superHard 
        ? hintsToReturnToUser = (await hintFunctions).superHardHints : 
    
    hintsToReturnToUser = `GAME CURRENTLY IN ${gameModes.default} MODE`
    console.log(theCurrentGamesMode, ',<--- the current games mode from game.sendhints2');

    return hintsToReturnToUser
}

module.exports = sendHints