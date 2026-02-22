import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma.js';

export const registerPlayer = async (req: Request, res: Response) => {
  const { nickname, secret } = req.body;

  if (!nickname || !secret) {
    return res.status(400).json({ error: 'Nickname and secret are required' });
  }

  try {
    const existing = await prisma.player.findUnique({ where: { nickname } });
    if (existing) {
      return res.status(400).json({ error: 'Nickname already taken' });
    }

    const passwordHash = await bcrypt.hash(secret, 12);

    const player = await prisma.player.create({
      data: { nickname, passwordHash },
      select: { id: true, nickname: true },
    });

    res.status(201).json({
      message: 'Player created. Save your secret!',
      player,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register player' });
  }
};

export const loginPlayer = async (req: Request, res: Response) => {
  const { nickname, secret } = req.body;

  if (!nickname || !secret) {
    return res.status(400).json({ error: 'Nickname and secret are required' });
  }

  try {
    const player = await prisma.player.findUnique({ where: { nickname } });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const valid = await bcrypt.compare(secret, player.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid secret' });
    }

    res.json({
      message: 'Login successful',
      player: { id: player.id, nickname: player.nickname },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};