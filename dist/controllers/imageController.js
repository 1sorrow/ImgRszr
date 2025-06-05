"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listImages = exports.uploadImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadImage = async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ error: "No file provided" });
        return;
    }
    const width = parseInt(req.body.width, 10);
    const height = parseInt(req.body.height, 10);
    if (!width || !height) {
        res.status(400).json({ error: "Width and height (integers) are required" });
        return;
    }
    const imagesDir = path_1.default.join(__dirname, "..", "..", "images");
    if (!fs_1.default.existsSync(imagesDir)) {
        fs_1.default.mkdirSync(imagesDir);
    }
    const outputFilename = `resized-${Date.now()}-${file.originalname}`;
    const outputPath = path_1.default.join(imagesDir, outputFilename);
    try {
        await (0, sharp_1.default)(file.path).resize(width, height).toFile(outputPath);
        res.json({
            message: "Image uploaded and resized successfully",
            imageUrl: `/images/${outputFilename}`,
            filename: outputFilename,
        });
    }
    catch (err) {
        console.error("Error resizing image:", err);
        res.status(500).json({ error: "Failed to resize image" });
    }
};
exports.uploadImage = uploadImage;
const listImages = (_req, res) => {
    const imagesDir = path_1.default.join(__dirname, "..", "..", "images");
    fs_1.default.readdir(imagesDir, (err, files) => {
        if (err) {
            res.status(500).json({ error: "Cannot list images" });
            return;
        }
        res.json({ files });
    });
};
exports.listImages = listImages;
