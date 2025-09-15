import express from 'express';
import { uploadVideo, getVideos } from '../controllers/videoController.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('video'), uploadVideo);
router.get('/:studentId/:examId', getVideos);

export default router;
