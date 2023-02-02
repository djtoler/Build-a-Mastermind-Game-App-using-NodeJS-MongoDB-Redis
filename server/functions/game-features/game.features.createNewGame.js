const NewGameBuilder = require("../game-helpers/game.helpers.game-template");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");
const { v4: uuidv4 } = require("uuid");
const gameID = uuidv4();

const createNewGame = async (currentUserEmail) => {
  console.log('in controller');

  let currentDatabase = await currentDatabaseInUse();
  let currentLoggedInUser = await currentDatabase.getUser(currentUserEmail);
  let currentUserID = currentLoggedInUser._id;

  console.log(currentLoggedInUser, '<<<------currentLoggedInUser');

  const newGameID = `${currentLoggedInUser.email}${gameID}`;
  
  const newGame = await new NewGameBuilder()
    .createGameProfile(currentLoggedInUser.email, newGameID, false, 'waiting', 0000, new Date(Date.now()).toString() )
    .createGameData([], 0, 0, 0, 0, false)
    .buildNewGame();

  console.log("NEW GAME CREATED FROM CREATE GAME FUNCTION: ==>", newGame);

  await currentDatabase.createGame(newGame, currentLoggedInUser)
 

  return newGame;
};

module.exports = createNewGame;
