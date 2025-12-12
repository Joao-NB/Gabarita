import express from 'express';
import { gerarQuiz } from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/', gerarQuiz);

export default router;
