import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  fitnessLevel: string;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export const User = mongoose.model<IUser>('User', userSchema);
