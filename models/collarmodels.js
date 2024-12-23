import { db } from '../config/pgsql.js';

const addCollar = async (macaddress, dogId) => {
  try {

    await db.query('BEGIN');

    const deleteQuery = `
      DELETE FROM collars
      WHERE dog_id = $1
      RETURNING id, macaddress;
    `;
    const deletedCollar = await db.query(deleteQuery, [dogId]);

    if (deletedCollar.rowCount > 0) {
      console.log('Deleted collar:', deletedCollar.rows[0]);
    }

    const insertQuery = `
      INSERT INTO collars (dog_id, macaddress)
      VALUES ($1, $2)
      RETURNING id, macaddress, dog_id;
    `;
    const result = await db.query(insertQuery, [dogId, macaddress]);

    await db.query('COMMIT');

    return result.rows[0];
  } catch (error) {

    await db.query('ROLLBACK');
    throw error;
  }
};

export { addCollar };
