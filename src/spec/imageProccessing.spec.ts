import sharp from "sharp";

describe("Image processing", () => {
  it("should resize an image using sharp", async () => {
    const resized = await sharp({
      create: {
        width: 300,
        height: 300,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .resize(100, 100)
      .toBuffer();

    const metadata = await sharp(resized).metadata();
    expect(metadata.width).toBe(100);
    expect(metadata.height).toBe(100);
  });
});
