const redis = require('redis');

const redisConnection = redis.createClient ({ 
    host: '127.0.0.1', 
    port: 6379 
}).on('connect', function name() {
    console.log('Redis connected ' + redis_host + ":" + redis_port);
})




module.exports = redisConnection;