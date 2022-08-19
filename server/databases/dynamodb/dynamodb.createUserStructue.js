const DynamoUserBuilder = require('./dynamodb.createUser.class')
const { v4: uuidv4 } = require('uuid');
const gameID = uuidv4()

async function returnNewDynamoDBUserStructure () {
    const newDynamoDBUser = await new DynamoUserBuilder()
                            .createDynamoDBUser ('jimmy01', 'jimmy01@yahoo.com', 'jimmyjam0509', 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
                            .createUserProfileAllTimeStats(0, 0, 0, 0)
                            .createUserProfileRankings(0, 0, 0, 0, 0)
                            .createGameProfile(gameID, false, 'default', 'default')
                            .createGameData('default', 0, 0, 0, 0, false)
                            .buildNewDynamoDBUser();
    console.log(newDynamoDBUser);
    return newDynamoDBUser
}     

module.exports = returnNewDynamoDBUserStructure