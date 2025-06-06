"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProccessor_1 = require("../src/utils/imageProccessor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));

describe("Image Processing Function", () => {
    // Fix path to dist/images/test.jpg
    const input = path_1.default.join(__dirname, "..", "images", "test.jpg");
    const output = path_1.default.join(__dirname, "..", "images", "resized-test.jpg");

    beforeAll(() => {
        if (!fs_1.default.existsSync(input)) {
            throw new Error("Test image not found: test.jpg");
        }
    });

    afterAll(() => {
        if (fs_1.default.existsSync(output)) {
            fs_1.default.unlinkSync(output);
        }
    });

    it("should resize an image without error", async () => {
        await expectAsync((0, imageProccessor_1.resizeImage)(input, 100, 100, output)).toBeResolved();
        expect(fs_1.default.existsSync(output)).toBeTrue();
    });
});
