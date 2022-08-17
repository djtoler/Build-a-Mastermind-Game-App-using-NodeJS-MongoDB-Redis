require('dotenv').config();
const {DynamoDBClient, CreateTableCommand} = require("@aws-sdk/client-dynamodb");
const connectDynamoDB = require('../../config/dynamodb')
const KEY = process.env.AWS_ACCESS_KEY_ID
const SUPERKEY = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.REGION

console.log(process.env.REGION );

async function testdynamo (){
    const dynamo = await connectDynamoDB()
    console.log('---------------------------------');
    const ddb = await new DynamoDBClient({
        region: 'us-east-1',
        AWS_ACCESS_KEY_ID:'AKIA4XS6OGG5ZHSUDLTM',
        AWS_SECRET_ACCESS_KEY:'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',
    })

    const table = {
        TableName: 'Games',
        KeySchema: [
            {AttributeName: 'TeamID', KeyType: 'HASH'},
            {AttributeName: 'SK', KeyType: 'RANGE'}
        ],
        AttributeDefinitions: [
            {AttributeName: 'TeamID', AttributeType: 'S'},
            {AttributeName: 'SK', AttributeType: 'S'},
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
    const command = await new CreateTableCommand(table)
    const response = await ddb.send(command);
    console.log(response, 'RESPONSE!!!!!!!');
}

testdynamo()

module.exports = testdynamo





















//   // usage
//   exports.handler = async (event, context) => {
//     try {
//       const { data } = event.body
//       await createItem(data)
//       return { body: 'successfully created item' }
//     } catch (err) {
//       return { error: err }
//     }
//   }

