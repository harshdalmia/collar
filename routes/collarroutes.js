import express from 'express';
import { initializeCollar } from '../controller/collarcontroller.js';

const router = express.Router();


router.get('/collar', initializeCollar);

export default router;
