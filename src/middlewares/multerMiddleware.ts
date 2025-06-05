import multer from "multer";
import path from "path";

// where and how to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // save files to the /images folder (outside src/)
    const uploadPath = path.join(__dirname, "..", "..", "images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use original name + timestamp as filename
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// accept only images
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
