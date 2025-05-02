import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// POST /api/upload
export const uploadImage = async (req: Request, res: Response) => {
  // Multer makes the file available as req.file
  const file = req.file as Express.Multer.File | undefined;
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  // Read width/height from form (as strings)
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  if (!width || !height) {
    return res
      .status(400)
      .json({ error: 'Width and height (integers) are required' });
  }

  // Ensure the images directory exists
  const imagesDir = path.join(__dirname, '..', '..', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // Define the output filename (prefix "resized-")
  const outputFilename = `resized-${file.filename}`;
  const outputPath = path.join(imagesDir, outputFilename);

  try {
    // use sharp to resize the image
    await sharp(file.path)
      .resize(width, height)
      .toFile(outputPath);

    // result >> new image url
    return res.json({
      message: 'Image uploaded and resized successfully',
      imageUrl: `/images/${outputFilename}`
    });
  } catch (err) {
    console.error('Error resizing image:', err);
    return res.status(500).json({ error: 'Failed to resize image' });
  }
};

// get images from dir
export const listImages = (req: Request, res: Response) => {
  const imagesDir = path.join(__dirname, '..', '..', 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Cannot list images' });
    }
    // return json with filenames
    res.json({ files });
  });
};

