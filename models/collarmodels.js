import { db } from '../config/pgsql.js';

const addCollar = async (name, email, phone_number, dog_type_id, collar_id) => {
  try {
    await db.query('BEGIN');

    // Insert the customer data with the dog_type_id instead of dog_type
    const insertCustomerQuery = `
      INSERT INTO customers (name, email, phone_number, dog_type, collar_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, phone_number, dog_type, collar_id;
    `;

    const result = await db.query(insertCustomerQuery, [
      name,
      email,
      phone_number,
      dog_type_id, // Use the dog_type_id here
      collar_id,
    ]);

    await db.query('COMMIT');

    return result.rows[0];
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
};

export { addCollar };
