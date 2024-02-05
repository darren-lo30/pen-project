import express from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import { getUserStrokeData } from '../controllers/strokeData/strokeData';

const router = express.Router();

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/strokeData', getUserStrokeData);

export default router;
