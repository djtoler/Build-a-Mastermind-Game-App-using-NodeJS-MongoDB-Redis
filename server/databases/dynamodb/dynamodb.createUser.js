const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const dynamoDBHelpers = require('./dynamodb.helpers')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

async function createNewDynamoDBUser () {

    const dynamoDBClient = await new DynamoDBClient(dynamoDBHelpers.dynamoConnectionObject);
    const dynamoDBDocument = DynamoDBDocument.from(dynamoDBClient);

    const createThisNewDynamoDBUser = await dynamoDBHelpers.returnNewDynamoDBUser()
    const dynamoDBUserCreationResponse = await dynamoDBDocument.put(createThisNewDynamoDBUser);
    return dynamoDBUserCreationResponse
}

module.exports = createNewDynamoDBUser
