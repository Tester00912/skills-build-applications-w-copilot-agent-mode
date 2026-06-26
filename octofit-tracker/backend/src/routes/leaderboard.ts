import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await Leaderboard.find().populate('userId', 'name username').sort({ points: -1 }).lean();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
