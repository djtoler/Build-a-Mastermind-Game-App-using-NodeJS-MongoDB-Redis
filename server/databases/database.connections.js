const mongo = Function('connectMongo()')
const mysql = Function('connectMysql()')
const dynamo = Function('connectDynamoDB()')
console.log(mongo);

module.exports = [mongo, mysql, dynamo]