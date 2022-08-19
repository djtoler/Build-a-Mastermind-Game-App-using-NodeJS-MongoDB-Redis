const returnNewDynamoDBUserStructure = require('./dynamodb.createUserStructue')

const dynamoConnectionObject = { 
    profile: 'amy', 
    region: "us-east-1", 
    AWS_ACCESS_KEY_ID: 'AKIA4XS6OGG5ZHSUDLTM', 
    AWS_SECRET_ACCESS_KEY: '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'
}

const returnNewDynamoDBUser = async () => {
    const createThisUser = await returnNewDynamoDBUserStructure()
    const newDynamoUser = {
        TableName: 'Games', 
        Item: {
            UserPartitionKey: createThisUser.user.email,
            GameSortKey: `${createThisUser.user.username}_${createThisUser.games[createThisUser.games.length - 1].gameID}`,
            ...createThisUser,
    }};
    return newDynamoUser
}


module.exports = {dynamoConnectionObject, returnNewDynamoDBUser}