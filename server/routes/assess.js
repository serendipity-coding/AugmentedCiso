import express from 'express';
const router = express.Router();
import assessController from '../controllers/assess.js';

router.get('/assess/:token', assessController.predictMeasures);

export default router;
