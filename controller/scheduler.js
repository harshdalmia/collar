import schedule from 'node-schedule';
import redisClient from '../config/redis.js';
import { updateDogSteps } from '../models/dogmodels.js'; 

// Schedule job to run every minute (or as per your requirement)
schedule.scheduleJob('*/5* * * *', async () => {
  console.log('Syncing dog data from Redis to PostgreSQL...');
  try {

    const keys = await redisClient.keys('dog:data:*');
    if (keys.length === 0) {
      console.log('No dog data keys found in Redis.');
      return;
    }

    console.log('Found Redis keys:', keys);  // Log all keys to debug

    for (const key of keys) {
      console.log('Redis Key:', key);  // Log each key

      // Correctly extract the macaddress (full part after 'dog:data:')
      const macaddress = key.split(':').slice(2).join(':');
      console.log('Extracted macaddress:', macaddress);

      if (!macaddress) {
        console.error('Invalid macaddress:', macaddress);
        continue;
      }

      const dogData = await redisClient.get(key);

      if (dogData) {
        const parsedData = JSON.parse(dogData);
        await updateDogSteps(macaddress, parsedData);  // Update dog data in PostgreSQL
        await redisClient.del(key);  // Delete the key after sync
      }
    }
    console.log('Dog data sync completed.');
  } catch (error) {
    console.error('Error syncing dog data:', error.message);
  }
});
