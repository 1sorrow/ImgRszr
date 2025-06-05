"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerMiddleware_1 = __importDefault(require("../middlewares/multerMiddleware"));
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
// post /api/upload
router.post("/", multerMiddleware_1.default.single("image"), (req, res, next) => {
    Promise.resolve((0, imageController_1.uploadImage)(req, res)).catch(next);
});
exports.default = router;
