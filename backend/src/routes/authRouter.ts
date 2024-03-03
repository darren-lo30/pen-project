import express from 'express';
import passport from '../config/passportConfig';

import { signUp, authenticate, signOut } from '../controllers/auth/auth';
import { checkAuthenticated } from '../middleware/authentication';
const router = express.Router();

router.post('/signin', passport.authenticate('local', {}), (req, res) => { res.send({user: req.user }); });
router.post('/signup', signUp);
router.post('/auth', checkAuthenticated, authenticate);
router.post('/signout', signOut);

export default router;
