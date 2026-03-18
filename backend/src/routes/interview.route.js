import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import { generateInterview } from '../controllers/interview.controller.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('resume'),generateInterview)

export default router;