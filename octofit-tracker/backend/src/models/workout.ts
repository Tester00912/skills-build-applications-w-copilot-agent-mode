import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  equipment: [{ type: String }],
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
