import schedule from 'node-schedule';
import redisClient from '../config/redis.js';
import { updateDogSteps } from '../models/dogmodels.js';

schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('Syncing dog data from Redis to PostgreSQL...');
  try {

    const keys = await redisClient.keys('dog:data:*');
    for (const key of keys) {
     
      
      const dogId = key.split(':')[2];
      console.log('Redis Key:', key);
      console.log('Extracted Dog ID:', dogId);
      if (!dogId || isNaN(parseInt(dogId, 10))) {
        console.error(`Invalid dog ID provided: ${dogId}`);
        continue;
      }

      const dogData = await redisClient.get(key);
     


      if (dogData) {
        const parsedData = JSON.parse(dogData);
        await updateDogSteps(dogId, parsedData);
        await redisClient.del(key);
      }
    }
    console.log('Dog data sync completed.');
  } catch (error) {
    console.error('Error syncing dog data:', error.message);
  }
});
