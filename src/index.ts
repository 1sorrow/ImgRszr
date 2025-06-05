import express from "express";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes";
import resizeRoutes from "./routes/resizeRoutes";
import imageRoutes from "./routes/imageRoutes";

const app = express();

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👇 Serve frontend from the root-level "public" folder (not inside dist/)
const publicPath = path.resolve(__dirname, "..", "public");
app.use(express.static(publicPath));

// 👇 Serve images from the "images" folder at the project root
app.use("/images", express.static(path.resolve(__dirname, "..", "images")));

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/resize", resizeRoutes);
app.use("/api/images", imageRoutes);

// 👇 Serve index.html fallback
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
