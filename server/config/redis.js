const redis = require('redis');

const connectRedis = () => {
    const client = redis.createClient({ return_buffers : true });
    client.connect();
    client.on('connect', function() {
        console.log('Connected!');
    });
}

module.exports = connectRedis;