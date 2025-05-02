import { Router } from 'express';
import multerMiddleware from '../middlewares/multerMiddleware';
import { uploadImage } from '../controllers/imageController';

const router = Router();

// post /api/upload
router.post(
  '/',
  multerMiddleware.single('image'),
  (req, res, next) => {
	Promise.resolve(uploadImage(req, res))
	  .catch(next);
  }
);

export default router;

