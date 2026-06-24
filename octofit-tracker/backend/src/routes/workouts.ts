import { Router } from 'express';
import { Workout } from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  const { title, durationMinutes, difficulty, focus } = req.body;
  const newWorkout = await Workout.create({
    title: title ?? 'New Workout',
    durationMinutes: durationMinutes ?? 20,
    difficulty: difficulty ?? 'intermediate',
    focus: focus ?? 'general'
  });
  res.status(201).json(newWorkout);
});

export default router;
