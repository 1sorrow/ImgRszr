import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const testImagePath: string = path.join(__dirname, 'test-function.jpg');
const outputImagePath: string = path.join(__dirname, 'resized-function.jpg');

async function resizeImage(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(inputPath).resize(width, height).toFile(outputPath);
}

describe('Image Processing Function', () => {
  beforeAll(async (): Promise<void> => {
    const buffer: Buffer = await sharp({
      create: {
        width: 300,
        height: 300,
        channels: 3,
        background: { r: 200, g: 200, b: 200 }
      }
    }).jpeg().toBuffer();

    fs.writeFileSync(testImagePath, buffer);
  });

  afterAll((): void => {
    [testImagePath, outputImagePath].forEach((file) => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });
  });

  it('should resize image without throwing', async (): Promise<void> => {
    await expectAsync(
      resizeImage(testImagePath, outputImagePath, 100, 100)
    ).toBeResolved();
  });
});
