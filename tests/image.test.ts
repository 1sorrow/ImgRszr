// src/tests/image.test.ts
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import app from '../src/index';

const testImagePath = path.join(__dirname, 'test-image.jpg');

beforeAll(async () => {
  // Create a test image using sharp
  const buffer = await sharp({
    create: {
      width: 200,
      height: 200,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  }).jpeg().toBuffer();
  fs.writeFileSync(testImagePath, buffer);
});

afterAll(() => {
  // clean up the test image file
  if (fs.existsSync(testImagePath)) {
    fs.unlinkSync(testImagePath);
  }
});

describe('POST /api/upload', () => {
  it('should upload and resize an image', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('image', testImagePath)
      .field('width', '100')
      .field('height', '100');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/success/);
    expect(res.body.imageUrl).toMatch(/^\/images\/resized-/);
  });

  it('should return 400 if no file is provided', async () => {
    const res = await request(app)
      .post('/api/upload')
      .field('width', '100')
      .field('height', '100');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No file provided');
  });
});
