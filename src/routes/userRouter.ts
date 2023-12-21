import express from 'express';

import { updatePreferences } from '../controllers/preferences/preferences';
import { checkAuthenticated } from '../middleware/authentication';
const router = express.Router();

router.put('/preferences', checkAuthenticated, updatePreferences);

export default router;