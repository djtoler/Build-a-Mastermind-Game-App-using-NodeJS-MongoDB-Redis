const createNewTableInDynamoDB = require('./dynamodb.createTable')
const createNewDynamoDBUser = require('./dynamodb.createUser')

async function createDocumentOrTable() {
    const returnNewDynamoDBTable = createNewTableInDynamoDB()
    return returnNewDynamoDBTable
}

async function createNewUser () {
    const returnNewDynamoDBUser = await createNewDynamoDBUser()
    return returnNewDynamoDBUser
}

createNewUser()

module.exports = createDocumentOrTable, createNewUser
