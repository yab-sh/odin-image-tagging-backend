import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma.js";

export const submitSession = async (req: Request, res: Response) => {
  const { nickname, secret, photoId, durationMs, foundAll } = req.body;

  const player = await prisma.player.findUnique({
    where: { nickname },
  });

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const valid = await bcrypt.compare(secret, player.passwordHash);

  if (!valid) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  const session = await prisma.gameSession.create({
    data: {
      playerId: player.id,
      photoId,
      durationMs,
      foundAll,
    },
  });

  let newBest = false;

  if (foundAll) {
    const existing = await prisma.leaderboardEntry.findUnique({
      where: { playerId: player.id },
    });

    if (!existing) {
      await prisma.leaderboardEntry.create({
        data: {
          playerId: player.id,
          bestTimeMs: durationMs,
        },
      });
      newBest = true;
    } else if (durationMs < existing.bestTimeMs) {
      await prisma.leaderboardEntry.update({
        where: { playerId: player.id },
        data: { bestTimeMs: durationMs },
      });
      newBest = true;
    }
  }

  res.json({ message: "Session saved", newBest });
};