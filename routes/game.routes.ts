import { Router } from 'express';
import { saveGameResult } from '../controllers/game.controller.js';

const router = Router();

router.post('/save-result', saveGameResult);

export default router;