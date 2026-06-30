import { Router } from 'express';
import { generateDocs } from '../controllers/ai.controller';

const router = Router();

// Endpoint: POST /api/ai/generate
router.post('/generate', generateDocs);

export default router;