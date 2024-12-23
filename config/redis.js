import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect().catch((err) => {
  console.error('Failed to connect to Redis:', err);
  throw err;
});

export default client;
