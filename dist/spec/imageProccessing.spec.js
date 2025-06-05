"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
describe("Image processing", () => {
    it("should resize an image using sharp", async () => {
        const resized = await (0, sharp_1.default)({
            create: {
                width: 300,
                height: 300,
                channels: 3,
                background: { r: 255, g: 255, b: 255 },
            },
        })
            .resize(100, 100)
            .toBuffer();
        const metadata = await (0, sharp_1.default)(resized).metadata();
        expect(metadata.width).toBe(100);
        expect(metadata.height).toBe(100);
    });
});
