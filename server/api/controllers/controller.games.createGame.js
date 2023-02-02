const asyncHandler = require("express-async-handler");
const createNewGame = require("../../functions/game-features/game.features.createNewGame");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");

const runCreateNewGameService = asyncHandler(async (req, res) => {
  console.log('in create new game');
  const { currentUserData } = req.body;
  let userEmail = JSON.parse(currentUserData).authorizeUser.user.email
  console.log('userEmail', '----> ', userEmail);
  const newGame = await createNewGame(userEmail);
  res.json({ currentGameID: newGame.gameProfile.gameID });
});

module.exports = runCreateNewGameService;
