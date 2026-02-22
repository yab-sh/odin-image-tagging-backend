import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.query;

    const characters = await prisma.character.findMany({
      where: photoId ? { photoId: String(photoId) } : {},
      select: {
        id: true,
        name: true,
        photoId: true,
        centerX: true,
        centerY: true,
        radius: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
};

export const getCharacterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const character = await prisma.character.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        photoId: true,
        centerX: true,
        centerY: true,
        radius: true,
      },
    });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch character' });
  }
};