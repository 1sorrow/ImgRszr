import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// post /api/resize
export const resizeImage = async (req: Request, res: Response) => {
  const { imageName, width, height } = req.body;
  if (!imageName || !width || !height) {
    return res
      .status(400)
      .json({ error: 'imageName, width, and height are required in JSON body' });
  }

  const imagesDir = path.join(__dirname, '..', '..', 'images');
  const inputPath = path.join(imagesDir, imageName);
  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const targetWidth = parseInt(width, 10);
  const targetHeight = parseInt(height, 10);
  if (!targetWidth || !targetHeight) {
    return res.status(400).json({ error: 'Width and height must be integers' });
  }

  // Define the output filename, e.g. resized-300x200-originalName.jpg
  const outputFilename = `resized-${targetWidth}x${targetHeight}-${imageName}`;
  const outputPath = path.join(imagesDir, outputFilename);

  try {
    await sharp(inputPath)
      .resize(targetWidth, targetHeight)
      .toFile(outputPath);

    return res.json({
      message: 'Image resized successfully',
      imageUrl: `/images/${outputFilename}`
    });
  } catch (err) {
    console.error('Error resizing image:', err);
    return res.status(500).json({ error: 'Failed to resize image' });
  }
};

