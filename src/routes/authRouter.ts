import express from 'express';
import passport from '../config/passportConfig';

import { signUp } from '../controllers/auth/auth';
const router = express.Router();

router.post('/signin', passport.authenticate('local', {}), (req, res) => {res.sendStatus(200);});
router.post('/signup', signUp);

export default router;