import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Ari Johnson', email: 'ari.johnson@octofit.dev', role: 'athlete' },
    { name: 'Maya Rivera', email: 'maya.rivera@octofit.dev', role: 'coach' },
    { name: 'Noah Kim', email: 'noah.kim@octofit.dev', role: 'athlete' }
  ]);

  const teams = await Team.create([
    { name: 'Ocean Velocity', members: 8, captain: users[0].id },
    { name: 'Peak Performance', members: 6, captain: users[1].id }
  ]);

  const activities = await Activity.create([
    { userId: users[0].id, type: 'Trail Run', durationMinutes: 55, caloriesBurned: 620, date: new Date('2026-06-20T07:15:00Z') },
    { userId: users[2].id, type: 'Strength Training', durationMinutes: 42, caloriesBurned: 410, date: new Date('2026-06-21T17:30:00Z') },
    { userId: users[0].id, type: 'Yoga Flow', durationMinutes: 35, caloriesBurned: 180, date: new Date('2026-06-22T06:45:00Z') }
  ]);

  const leaderboard = await Leaderboard.create([
    { rank: 1, team: teams[0].name, score: 1890 },
    { rank: 2, team: teams[1].name, score: 1725 },
    { rank: 3, team: 'Sunrise Sprinters', score: 1590 }
  ]);

  const workouts = await Workout.create([
    { title: 'Full Body Strength Blast', durationMinutes: 40, difficulty: 'intermediate', focus: 'strength' },
    { title: 'Recovery Stretch Series', durationMinutes: 25, difficulty: 'beginner', focus: 'mobility' },
    { title: 'Cardio Endurance Builder', durationMinutes: 50, difficulty: 'advanced', focus: 'endurance' }
  ]);

  console.log('Seed complete:');
  console.log({ users: users.length, teams: teams.length, activities: activities.length, leaderboard: leaderboard.length, workouts: workouts.length });

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
