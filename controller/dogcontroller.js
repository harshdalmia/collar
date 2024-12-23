import redisClient from '../config/redis.js';
import { updateDogSteps } from '../models/dogmodels.js';

const updateDogData = async (req, res) => {
  const { id } = req.params;
  const { timestamp, ambient_temp, object_temp, accel_x, accel_y, accel_z, gyro_x, gyro_y, gyro_z, mpu_temp, ir_value, bpm, avg_bpm } = req.body;

  try {
    const dogData = {
      timestamp,
      ambient_temp,
      object_temp,
      accel_x,
      accel_y,
      accel_z,
      gyro_x,
      gyro_y,
      gyro_z,
      mpu_temp,
      ir_value,
      bpm,
      avg_bpm,
    };

    
    await redisClient.set(`dog:data:${id}`, JSON.stringify(dogData));

    res.status(200).json({ message: 'Dog data updated in Redis successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dog data', details: error.message });
  }
};

export { updateDogData };
