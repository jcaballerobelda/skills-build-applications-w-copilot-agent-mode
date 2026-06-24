import { Schema, model } from 'mongoose';

export interface LeaderboardDoc {
  rank: number;
  team: string;
  score: number;
}

const leaderboardSchema = new Schema<LeaderboardDoc>({
  rank: { type: Number, required: true },
  team: { type: String, required: true },
  score: { type: Number, required: true }
}, { timestamps: true });

export const Leaderboard = model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
