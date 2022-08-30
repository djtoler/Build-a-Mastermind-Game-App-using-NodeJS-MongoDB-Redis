const NewGameBuilder = require('./game.class')
const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')
const {defaultBusinessLogicNewGameObj} = require('./businessLogicTemplate')
const { v4: uuidv4 } = require("uuid");
const gameID = uuidv4()

const createNewGame = async (currentDatabase, currentLoggedInUser, currentUserEmail) => {
    currentDatabase = await currentDatabaseInUse()  
    currentLoggedInUser = await currentDatabase.getUser(currentUserEmail)

    const createNewGameID = `${currentLoggedInUser.email}${gameID}`
    const returnNewGame = await new NewGameBuilder()
                            .createGameProfile(currentLoggedInUser.email, createNewGameID, defaultBusinessLogicNewGameObj.is2Player, defaultBusinessLogicNewGameObj.gameMode, defaultBusinessLogicNewGameObj.randomNumber, new Date(Date.now()).toString())
                            .createGameData([], 0, 0, 0, 0, false)
                            .buildNewGame()
    console.log('NEW GAME CREATED FROM CREATE GAME FUNCTION: ==>', returnNewGame);
    return returnNewGame
}

module.exports = createNewGame