const {
  DynamoDBClient,
  CreateTableCommand
} = require("@aws-sdk/client-dynamodb");

const connectDynamoDB = async () => {
  try {
    const dynamoConnection = await new DynamoDBClient({
      region: "us-east-1",
      aws_access_key_id:'AKIA4XS6OGG5ZHSUDLTM',
      aws_secret_access_key:'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',
    });
    console.log(`YOU ARE NOW CONNECTED TO --> DYNAMODB`);
    // console.log(dynamoConnection);
    return dynamoConnection;
  } 
  catch (error) {
    console.log("Error: " + error.message);
    process.exit();
  }
};


module.exports = connectDynamoDB;
