"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const resizeRoutes_1 = __importDefault(require("./routes/resizeRoutes"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
// Middleware to parse request bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 👇 Serve frontend from the root-level "public" folder (not inside dist/)
const publicPath = path_1.default.resolve(__dirname, "..", "public");
app.use(express_1.default.static(publicPath));
// 👇 Serve images from the "images" folder at the project root
app.use("/images", express_1.default.static(path_1.default.resolve(__dirname, "..", "images")));
// API routes
app.use("/api/upload", uploadRoutes_1.default);
app.use("/api/resize", resizeRoutes_1.default);
app.use("/api/images", imageRoutes_1.default);
// 👇 Serve index.html fallback
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
exports.default = app;
