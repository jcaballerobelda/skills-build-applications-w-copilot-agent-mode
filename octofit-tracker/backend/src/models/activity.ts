import { Schema, model } from 'mongoose';

export interface ActivityDoc {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDoc>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  caloriesBurned: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true }
}, { timestamps: true });

export const Activity = model<ActivityDoc>('Activity', activitySchema);
