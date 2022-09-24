const asyncHandler = require("express-async-handler");
const createNewGame = require('../../functions/game.components.createNewGame')
const currentDatabaseInUse = require('../../databases/settings/database.currentdatabase')

const runCreateNewGameService = asyncHandler(async (req, res) => {
    const {currentUserData} = req.body
    const currentDatabase = await currentDatabaseInUse()
    const newGame = await createNewGame(currentDatabase, currentUserData, currentUserData.email);
    res.json({currentGameID: newGame.gameProfile.gameID})
});

module.exports = runCreateNewGameService