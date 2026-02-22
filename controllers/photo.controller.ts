import { Request, Response } from "express";
import { prisma } from '../prisma.js';

export const getPhotos = async (_req: Request, res: Response) => {
  const photos = await prisma.photo.findMany({
    select: {
      id: true,
      url: true,
      width: true,
      height: true,
    },
  });

  res.json(photos);
};

export const getPhotoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const photo = await prisma.photo.findUnique({
    where: { id },
    include: {
      characters: true,
    },
  });

  if (!photo) {
    return res.status(404).json({ error: "Photo not found" });
  }

  res.json(photo);
};