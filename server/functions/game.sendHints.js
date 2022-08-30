const returnSuperEasyHints = require('./game.components.superEasyHints')
const {gameModes} = require('./game.helpers')

async function sendHints (theCurrentGameMode, theCurrentGamesRandomNumber) {
    console.log('in hint function');
    let hintEvaluation;
    const superEasyHints = await returnSuperEasyHints(4, theCurrentGamesRandomNumber) 
    if (gameModes.superEasy == theCurrentGameMode) {hintEvaluation = superEasyHints}
    return { hintForCurrentGameMode: hintEvaluation }
}

module.exports = sendHints