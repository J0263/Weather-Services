

import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Serve index.html
// TODO: Define route to serve index.htmlimport path from 'node:path';
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;