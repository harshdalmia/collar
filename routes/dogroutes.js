import express from 'express';
import { updateDogData } from '../controller/dogcontroller.js';

const router = express.Router();


router.post('/dog/:macaddress', updateDogData);

export default router;
