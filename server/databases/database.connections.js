const mongo = Function('connectMongo()')
const mysql = Function('connectMysql()')
const dynamo = Function('connectDynamoDB()')

module.exports = [mongo, mysql, dynamo]