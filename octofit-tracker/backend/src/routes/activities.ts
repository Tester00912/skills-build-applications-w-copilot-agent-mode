import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

export default router;
