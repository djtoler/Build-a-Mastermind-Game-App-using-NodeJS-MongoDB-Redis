const DynamoUserBuilder = require('./dynamodb.createUser.class')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const gameID = uuidv4()

async function returnNewDynamoDBUserStructure () {
    const salt = await bcrypt.genSalt(10);
    const newDynamoDBUser = await new DynamoUserBuilder()
                            .createDynamoDBUser ('bigmack011', 'bigmack011@yahoo.com', 'bigmack88881', 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg')
                            .createUserProfileAllTimeStats(0, 0, 0, 0)
                            .createUserProfileRankings(0, 0, 0, 0, 0)
                            .createGameProfile(gameID, false, 'default', 'default')
                            .createGameData('default', 0, 0, 0, 0, false)
                            .buildNewDynamoDBUser();

    newDynamoDBUser.user.password = await bcrypt.hash(newDynamoDBUser.user.password, salt);
    
    const dynamoDBUserPassword = newDynamoDBUser.user.password    
    newDynamoDBUser.matchPassword = async function (enteredPassword) {return await bcrypt.compare(enteredPassword, dynamoDBUserPassword)}
    return newDynamoDBUser
}     

module.exports = returnNewDynamoDBUserStructure
