import { Schema, model } from 'mongoose';

export interface UserDoc {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
}

const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'], default: 'athlete' }
}, { timestamps: true });

export const User = model<UserDoc>('User', userSchema);
