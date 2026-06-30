import { Router } from 'express';
import { generateDocs, getHistory } from '../controllers/ai.controller';

const router = Router();

// Endpoint: POST /api/ai/generate
router.post('/generate', generateDocs);
router.get('/history', getHistory);

export default router;