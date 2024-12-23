import {db} from '../config/pgsql.js';

const addCustomer = async (name, email) => {
  const query = 'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *';
  const result = await db.query(query, [name, email]);
  return result.rows[0];
};

const getCustomerById = async (id) => {
  const query = 'SELECT * FROM customers WHERE id = $1';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

export { addCustomer, getCustomerById };
