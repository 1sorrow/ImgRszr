"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// where and how to save uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // save files to the /images folder (outside src/)
        const uploadPath = path_1.default.join(__dirname, "..", "..", "images");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use original name + timestamp as filename
        const ext = path_1.default.extname(file.originalname);
        const name = path_1.default.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    },
});
// accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
exports.default = upload;
