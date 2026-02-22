import { Router } from 'express';

import authRoutes from './auth.routes.js';
import playerRoutes from './player.routes.js';
import leaderboardRoutes from './leaderboard.routes.js';
import characterRoutes from './character.routes.js';
import gameRoutes from './game.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/players', playerRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/characters', characterRoutes);
router.use('/game', gameRoutes)

export default router;