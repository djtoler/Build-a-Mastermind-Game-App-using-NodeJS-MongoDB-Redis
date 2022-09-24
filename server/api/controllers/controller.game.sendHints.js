const asyncHandler = require("express-async-handler");
const sendHints = require('../../functions/game.sendHints')

const runSendHintsService = asyncHandler(async (req, res) => {
    const {theCurrentGamesMode, theCurrentGamesRandomNumber} = req.body
    const returnHints = await sendHints(theCurrentGamesMode, theCurrentGamesRandomNumber)
    res.json(returnHints)
});

module.exports = runSendHintsService