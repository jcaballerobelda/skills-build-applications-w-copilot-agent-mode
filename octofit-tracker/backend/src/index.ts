import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

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

  console.log(`Server listening on http://localhost:${port}`);
});
