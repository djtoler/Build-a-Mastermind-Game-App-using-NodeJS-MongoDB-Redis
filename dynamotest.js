// const DynamoDBClient = require("@aws-sdk/client-dynamodb");
// const BatchExecuteStatementCommand = require("@aws-sdk/client-dynamodb");
// const connectDynamoDB = require('../../config/dynamodb')
// const dynamo = connectDynamoDB()

// console.log(typeof dynamo, dynamo);
// console.log('in dynamo');
// // const params = {
// //     TableName: 'ProductTable',
// //     Item: {
// //         id: '001',
// //         price: 100.0,
// //         inStock: true,
// //         name: 'Yeezys',
// //         sizes: [8, 8.5, 9, 10, 11, 12, 13],
// //     },
// // }

// const itemData = {
//     id: '001',
//     price: 100.0,
//     inStock: true,
//     name: 'Yeezys',
//     sizes: [8, 8.5, 9, 10, 11, 12, 13],
// }

// // dynamo.put(params, function (err, data) {
// //     if (err) console.log(err)
// //     else console.log(data)
// // })

// async function createItem(itemData) {
//     const params = {
//       TableName: 'ProductTable',
//       Item: itemData,
//     }
//     try {
//         console.log(params);
//         await dynamo.put(params).promise()
//     } catch (err) {
//       return err
//     }
// }

// createItem(itemData)
// console.log('in dynamo beloooowwww');