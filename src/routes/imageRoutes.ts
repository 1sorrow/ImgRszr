import { Router } from "express";
import { listImages } from "../controllers/imageController";

const router = Router();

// get image list
router.get("/", listImages);

export default router;
