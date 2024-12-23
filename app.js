import express from 'express';
import dotenv from 'dotenv';
import dogRoutes from './routes/dogroutes.js';
import collarRoutes from './routes/collarroutes.js';
import './controller/scheduler.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', dogRoutes);    
app.use('/api', collarRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
