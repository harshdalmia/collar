import redisClient from '../config/redis.js';
import { updateDogSteps } from '../models/dogmodels.js';

const updateDogData = async (req, res) => {
  const { timestamp, ambient_temp, object_temp, accel_x, accel_y, accel_z, gyro_x, gyro_y, gyro_z, mpu_temp, ir_value, bpm, avg_bpm } = req.body;
  const macaddress = req.params.macaddress;  // Extract macaddress from URL parameter

  if (!macaddress) {
    return res.status(400).json({ error: "Macaddress is required." });
  }

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

    // Store the dog data in Redis with macaddress as the key
    await redisClient.set(`dog:data:${macaddress}`, JSON.stringify(dogData));

    res.status(200).json({ message: 'Dog data updated in Redis successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dog data', details: error.message });
  }
};

export { updateDogData };
