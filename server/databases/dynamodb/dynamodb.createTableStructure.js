const DynamoTableBuilder = require('./dynamodb.createTable.class')

async function returnNewDynamoDBTableStructure () {
    const newDynamoDBTable = await new DynamoTableBuilder()
                            .createDynamoTableName('Games')
                            .createDynamoTablePartitionKey("UserPartitionKey", "HASH", "S")
                            .createDynamoTableSortKey("GameSortKey", "RANGE", "S")
                            .createDynamoTableThroughputObject(5, 5)
                            .buildNewDynamoDBTable()
                            return newDynamoDBTable
}

module.exports = returnNewDynamoDBTableStructure














































// const dynamoDBTableStructureComponents = {
//     tableName, 
//     partitionKey, 
//     partitionKeyType,
//     partitionKeyDataType, 
//     sortKey, 
//     sortKeyType,
//     sortKeyDataType,
//     readUnits, 
//     writeUnits 
// }
