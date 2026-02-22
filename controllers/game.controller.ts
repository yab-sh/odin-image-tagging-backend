import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const saveGameResult = async (req: Request, res: Response) => {
  const { playerId, durationMs } = req.body;

  if (!playerId || !durationMs) {
    return res.status(400).json({ error: 'playerId and durationMs required' });
  }

  try {
    const existing = await prisma.leaderboardEntry.findUnique({
      where: { playerId }
    });

    if (!existing) {

      await prisma.leaderboardEntry.create({
        data: {
          playerId,
          bestTimeMs: durationMs
        }
      });
    } else if (durationMs < existing.bestTimeMs) {
      await prisma.leaderboardEntry.update({
        where: { playerId },
        data: { bestTimeMs: durationMs }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save result' });
  }
};