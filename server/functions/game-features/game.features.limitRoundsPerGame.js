const {defaultUserFromRequestBody, defaultGameFromRequestBodyID} = require('../businessLogicTemplate')
const currentDatabaseInUse = require('../../databases/settings/database.currentdatabase')
const createNewGame = require('./game.createNewGame')

const limitRoundsPerGameAndCreateNewGameWhenLimitIsReached = 
async (currentUser, currentUserEmail, confirmedCurrentUser, currentDatabase) => {
    currentDatabase = await currentDatabaseInUse()    
    let returnCurrentGameOrCreateNewGame = await currentDatabase.getCurrentGame({ id: defaultGameFromRequestBodyID});
    
    if (returnCurrentGameOrCreateNewGame.roundsPlayed >= 1) {
        currentUser = defaultUserFromRequestBody.authorizeUser.user
        currentUserEmail = currentUser.email;

        confirmedCurrentUser = await currentDatabase.getUser(currentUserEmail)
        returnCurrentGameOrCreateNewGame = await createNewGame(currentDatabase, confirmedCurrentUser, currentUserEmail)
        
        await confirmedCurrentUser.games.push(returnCurrentGameOrCreateNewGame)
    }
    return returnCurrentGameOrCreateNewGame
}

// limitRoundsPerGameAndCreateNewGameWhenLimitIsReached()

module.exports = limitRoundsPerGameAndCreateNewGameWhenLimitIsReached