const redis = require('redis');

const connectRedis = () => {
    const client = redis.createClient({ return_buffers : true });
    client.connect();
    client.on('connect', function() {
        console.log('YOU ARE NOW CONNECTED TO -----> REDIS');
    });
}

module.exports = connectRedis;