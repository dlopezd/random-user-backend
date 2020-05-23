let client = require('redis').createClient(process.env.REDISTOGO_URL);
let Redis = require('ioredis');
let redis = new Redis(process.env.REDISTOGO_URL);

module.exports.redisClient = client;