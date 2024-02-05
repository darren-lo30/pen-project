import express from 'express';
import { getUserStrokeData } from '../controllers/strokeData/strokeData';
const router = express.Router();

router.get('/', getUserStrokeData);

export default router;
