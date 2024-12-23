import { executeSQLFromFile } from './config/pgsql.js';

const initDatabase = async () => {
  const filePath = './SQL.sql'; 
  await executeSQLFromFile(filePath);
};

initDatabase().then(() => {
  console.log('Database setup complete');
  process.exit(0); // Exit the process after completion
}).catch((error) => {
  console.error('Database setup failed:', error.message);
  process.exit(1);
});
