import { db } from '../config/pgsql.js';


const updateDogSteps = async (id, dogData) => {
  
  if (!id || isNaN(id)) {
    throw new Error('Invalid dog ID provided.');
  }

  
  const {
    timestamp,
    ambient_temp = null,
    object_temp = null,
    accel_x = null,
    accel_y = null,
    accel_z = null,
    gyro_x = null,
    gyro_y = null,
    gyro_z = null,
    mpu_temp = null,
    ir_value = null,
    bpm = null,
    avg_bpm = null,
  } = dogData;

  
  if (!timestamp) {
    throw new Error('Timestamp is required.');
  }

  const query = `
    UPDATE dogs
    SET timestamp = $1, ambient_temp = $2, object_temp = $3, accel_x = $4, accel_y = $5, accel_z = $6,
        gyro_x = $7, gyro_y = $8, gyro_z = $9, mpu_temp = $10, ir_value = $11, bpm = $12, avg_bpm = $13
    WHERE id = $14
    RETURNING *`;

  try {
    const result = await db.query(query, [
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
      id,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`No dog found with ID ${id}.`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating dog steps:', error.message);
    throw new Error('Failed to update dog data.');
  }
};

export { updateDogSteps };

