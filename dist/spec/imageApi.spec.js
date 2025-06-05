"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const index_1 = __importDefault(require("../index"));
const testImagePath = path_1.default.join(__dirname, "test-api.jpg");
beforeAll(async () => {
    const buffer = await (0, sharp_1.default)({
        create: {
            width: 200,
            height: 200,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
        },
    })
        .jpeg()
        .toBuffer();
    fs_1.default.writeFileSync(testImagePath, buffer);
});
afterAll(() => {
    if (fs_1.default.existsSync(testImagePath)) {
        fs_1.default.unlinkSync(testImagePath);
    }
});
describe("POST /api/upload", () => {
    it("should upload and resize an image", async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/api/upload")
            .attach("image", testImagePath)
            .field("width", "100")
            .field("height", "100");
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/success/i);
        expect(res.body.imageUrl).toMatch(/^\/images\/resized-/);
    });
    it("should return 400 if no file is provided", async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post("/api/upload")
            .field("width", "100")
            .field("height", "100");
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("No file provided");
    });
});
