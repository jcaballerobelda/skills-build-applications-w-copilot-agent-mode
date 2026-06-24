import { Router } from 'express';
import { User } from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, role } = req.body;
  const newUser = await User.create({
    name: name ?? 'New User',
    email: email ?? `user+${Date.now()}@octofit.dev`,
    role: role ?? 'athlete'
  });
  res.status(201).json(newUser);
});

export default router;
