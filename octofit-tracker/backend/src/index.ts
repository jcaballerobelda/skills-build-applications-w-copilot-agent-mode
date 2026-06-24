import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${port}-${codespaceName}.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiUrl });
});

app.get('/api', (_req, res) => {
  res.json({ apiUrl, port, environment: codespaceName ? 'codespaces' : 'local' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log('Connected to MongoDB:', mongoUri);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }

  console.log(`Server listening on ${apiUrl}`);
});
