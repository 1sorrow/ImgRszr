"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));

describe("Image processing", () => {
    const inputImage = path_1.default.resolve(__dirname, "..", "..", "images", "test.jpg");

    it("should resize an image using sharp", async () => {
        if (!fs_1.default.existsSync(inputImage)) {
            throw new Error("❌ test.jpg not found in images folder. Please add it before testing.");
        }

        const resizedBuffer = await (0, sharp_1.default)(inputImage)
            .resize(100, 100)
            .toBuffer();

        const metadata = await (0, sharp_1.default)(resizedBuffer).metadata();
        expect(metadata.width).toBe(100);
        expect(metadata.height).toBe(100);
    });
});
