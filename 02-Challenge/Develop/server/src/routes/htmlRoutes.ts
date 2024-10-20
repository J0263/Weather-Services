

import { Router } from 'express';
import path from 'path';  // Import path module
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Serve index.html
// TODO: Define route to serve index.htmlimport path from 'node:path';

// Serve index.html
router.get('/', (_req, res) => {  // Changed `req` to `_req` to indicate it's unused
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;