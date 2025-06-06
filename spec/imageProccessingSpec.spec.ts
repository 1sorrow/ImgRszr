import { resizeImage } from "../src/utils/imageProccessor";
import fs from "fs";
import path from "path";

describe("Image Processing Function", () => {
  const input = path.join(__dirname, "..", "..", "images", "test.jpg");
  const output = path.join(__dirname, "..", "..", "images", "resized-test.jpg");

  beforeAll(() => {
    if (!fs.existsSync(input)) {
      throw new Error("Test image not found: test.jpg");
    }
  });

  afterAll(() => {
    if (fs.existsSync(output)) fs.unlinkSync(output);
  });

  it("should resize an image without error", async () => {
    await expectAsync(resizeImage(input, 100, 100, output)).toBeResolved();
    expect(fs.existsSync(output)).toBeTrue();
  });
});
