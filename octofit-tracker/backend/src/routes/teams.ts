import { Router } from 'express';
import { Team } from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

router.post('/', async (req, res) => {
  const { name, members, captain } = req.body;
  const newTeam = await Team.create({
    name: name ?? 'New Team',
    members: members ?? 1,
    captain: captain ?? 'Unknown Captain'
  });
  res.status(201).json(newTeam);
});

export default router;
