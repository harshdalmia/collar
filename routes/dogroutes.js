import express from 'express';
import { updateDogData } from '../controller/dogcontroller.js';

const router = express.Router();


router.put('/dog/:id', updateDogData);

export default router;
