import { Router } from 'express';
import { Activity } from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json(activities);
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, caloriesBurned, date } = req.body;
  const newActivity = await Activity.create({
    userId: userId ?? 'unknown',
    type: type ?? 'Activity',
    durationMinutes: durationMinutes ?? 0,
    caloriesBurned: caloriesBurned ?? 0,
    date: date ? new Date(date) : new Date()
  });
  res.status(201).json(newActivity);
});

export default router;
