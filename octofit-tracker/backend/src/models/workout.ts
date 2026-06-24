import { Schema, model } from 'mongoose';

export interface WorkoutDoc {
  title: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: string;
}

const workoutSchema = new Schema<WorkoutDoc>({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  focus: { type: String, required: true }
}, { timestamps: true });

export const Workout = model<WorkoutDoc>('Workout', workoutSchema);
