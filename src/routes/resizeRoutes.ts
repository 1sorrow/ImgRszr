import { Router } from "express";
import { resizeImage } from "../controllers/resizeController";

const router = Router();

// post /api/resize
router.post("/", (req, res, next) => {
  Promise.resolve(resizeImage(req, res)).catch(next);
});

export default router;
