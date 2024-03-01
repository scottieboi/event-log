import express from 'express';
import * as path from 'path';

const router = express.Router();

router.get('/log', async (req, res) => {
  const logFilePath = path.join(__dirname, '../data/events.log');

  // add your implementation here
});

export default router;
