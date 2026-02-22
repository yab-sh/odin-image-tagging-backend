import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getLeaderboard = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;

  try {
    const entries = await prisma.leaderboardEntry.findMany({
      orderBy: { bestTimeMs: 'asc' },
      take: limit,
      include: {
        player: {
          select: { nickname: true },
        },
      },
    });

    const result = entries.map(entry => ({
      nickname: entry.player.nickname,
      bestTimeMs: entry.bestTimeMs,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};