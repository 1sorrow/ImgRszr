import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) {
    res.status(400).json({ error: 'No file provided' });
    return;
  }

  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  if (!width || !height) {
    res.status(400).json({ error: 'Width and height (integers) are required' });
    return;
  }

  const imagesDir = path.join(__dirname, '..', '..', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  const outputFilename = `resized-${Date.now()}-${file.originalname}`;
  const outputPath = path.join(imagesDir, outputFilename);

  try {
    await sharp(file.path).resize(width, height).toFile(outputPath);

    res.json({
      message: 'Image uploaded and resized successfully',
      imageUrl: `/images/${outputFilename}`,
      filename: outputFilename
    });
  } catch (err) {
    console.error('Error resizing image:', err);
    res.status(500).json({ error: 'Failed to resize image' });
  }
};

export const listImages = (_req: Request, res: Response): void => {
  const imagesDir = path.join(__dirname, '..', '..', 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Cannot list images' });
      return;
    }
    res.json({ files });
  });
};
