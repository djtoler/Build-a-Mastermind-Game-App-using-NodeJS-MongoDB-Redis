const redis = require("redis");

const connectToCacheEngine = async () => {
    let client = redis.createClient();
    const redisClient = await client.connect();
    client.on("connect", function () {console.log("***Connected TO REDIS**!")});
    return {client, redisClient}
}

module.exports = connectToCacheEngine