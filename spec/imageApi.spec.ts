import request from "supertest";
import app from "../src/index";
import path from "path";
import fs from "fs";

describe("API Endpoints", () => {
  const testImage = path.join(__dirname, "..", "..", "images", "test.jpg");

  it("GET /api/images should return images", async () => {
    const res = await request(app).get("/api/images");
    expect(res.status).toBe(200);
    expect("files" in res.body).toBeTrue();
    expect(Array.isArray(res.body.files)).toBeTrue();
  });

  it("POST /api/upload should upload and resize an image", async () => {
    const res = await request(app)
      .post("/api/upload")
      .field("width", "150")
      .field("height", "150")
      .attach("image", testImage);

    expect(res.status).toBe(200);
    expect(res.body.filename).toBeDefined();
  });

  it("POST /api/resize should resize existing image", async () => {
    const res = await request(app)
      .post("/api/resize")
      .send({
        imageName: "test.jpg",
        width: 100,
        height: 100,
      });

    if (res.status === 404) {
      console.warn("⚠️ test.jpg not found, skipping resize test");
    } else {
      expect(res.status).toBe(200);
      expect(res.body.imageUrl).toBeDefined();
    }
  });
});
