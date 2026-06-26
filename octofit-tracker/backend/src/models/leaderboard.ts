import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
