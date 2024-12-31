const { createClient } = require('redis');
const logger = require('@r/utils/logger');
const { report } = require('@r/utils/helpers');

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('error', err => console.log(err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
