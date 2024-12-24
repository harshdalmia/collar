import { db } from '../config/pgsql.js';

const updateDogSteps = async (macaddress, dogData) => {
  if (!macaddress) {
    throw new Error('Invalid macaddress provided.');
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
    INSERT INTO collar_log (
      timestamp, ambient_temp, object_temp, accel_x, accel_y, accel_z,
      gyro_x, gyro_y, gyro_z, mpu_temp, ir_value, bpm, avg_bpm, macaddress
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;

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
      macaddress,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`Failed to insert dog data for macaddress: ${macaddress}.`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating dog steps:', error.message);
    throw new Error('Failed to insert dog data into collar_log.');
  }
};

export { updateDogSteps };
