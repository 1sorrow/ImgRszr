"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// POST /api/resize
const resizeImage = async (req, res) => {
    const { imageName, width, height } = req.body;
    if (!imageName || !width || !height) {
        return res.status(400).json({
            error: "imageName, width, and height are required in JSON body",
        });
    }
    const targetWidth = parseInt(width, 10);
    const targetHeight = parseInt(height, 10);
    if (isNaN(targetWidth) ||
        isNaN(targetHeight) ||
        targetWidth <= 0 ||
        targetHeight <= 0) {
        return res.status(400).json({
            error: "Width and height must be valid positive integers",
        });
    }
    const imagesDir = path_1.default.resolve(__dirname, "..", "..", "images");
    const inputPath = path_1.default.join(imagesDir, imageName);
    if (!fs_1.default.existsSync(inputPath)) {
        return res.status(404).json({ error: "Image not found" });
    }
    const outputFilename = `resized-${targetWidth}x${targetHeight}-${imageName}`;
    const outputPath = path_1.default.join(imagesDir, outputFilename);
    try {
        await (0, sharp_1.default)(inputPath).resize(targetWidth, targetHeight).toFile(outputPath);
        return res.status(200).json({
            message: "Image resized successfully",
            imageUrl: `/images/${outputFilename}`,
        });
    }
    catch (err) {
        console.error("Error resizing image:", err);
        return res.status(500).json({ error: "Failed to resize image" });
    }
};
exports.resizeImage = resizeImage;
