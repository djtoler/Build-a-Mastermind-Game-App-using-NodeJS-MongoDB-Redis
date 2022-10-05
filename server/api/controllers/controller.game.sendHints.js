const sendHints = require('../../functions/game.sendHints')

const runSendHintsService = async (req, res) => {
    const {theCurrentGamesMode, theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter} = req.body
    
    console.log(req.body, '<<<<------- request body from hints');
    console.log(theCurrentGamesMode, ',<--- the current games mode from controller');
    
    const returnHints = await sendHints(theCurrentGamesMode, theCurrentGamesRandomNumber, mostCurrentUserGuess, easyHintButtonClickCounter)
    console.log(returnHints, '<<----FIX THIS supereasy BUG');
    res.json(returnHints)
};

module.exports = runSendHintsService