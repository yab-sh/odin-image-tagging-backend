import { Router } from 'express';
import {
  registerPlayer,
  loginPlayer
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerPlayer);
router.post('/login', loginPlayer);

export default router;