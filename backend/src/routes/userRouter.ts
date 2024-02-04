import express from 'express';

import { getPreferences, updatePreferences } from '../controllers/preferences/preferences';
import { checkAuthenticated } from '../middleware/authentication';
const router = express.Router();

router.put('/preferences', checkAuthenticated, updatePreferences);
router.get('/preferences', checkAuthenticated, getPreferences);

export default router;