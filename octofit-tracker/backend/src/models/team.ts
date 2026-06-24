import { Schema, model } from 'mongoose';

export interface TeamDoc {
  name: string;
  members: number;
  captain: string;
}

const teamSchema = new Schema<TeamDoc>({
  name: { type: String, required: true },
  members: { type: Number, required: true, min: 1 },
  captain: { type: String, required: true }
}, { timestamps: true });

export const Team = model<TeamDoc>('Team', teamSchema);
