import dotenv from 'dotenv';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';
import { connectToDatabase } from '../config/database';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teamAlpha = await Team.create({
    name: 'Alpha Squad',
    sport: 'CrossFit',
    members: [],
  });

  const teamBeta = await Team.create({
    name: 'Beta Crew',
    sport: 'Cycling',
    members: [],
  });

  const users = await User.create([
    {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      username: 'ada',
      fitnessLevel: 'advanced',
      teamId: teamAlpha._id,
    },
    {
      name: 'Grace Hopper',
      email: 'grace@example.com',
      username: 'grace',
      fitnessLevel: 'intermediate',
      teamId: teamBeta._id,
    },
    {
      name: 'Katherine Johnson',
      email: 'katherine@example.com',
      username: 'katherine',
      fitnessLevel: 'beginner',
      teamId: teamAlpha._id,
    },
  ]);

  await Team.updateMany(
    {},
    { $set: { members: users.map((user) => user._id) } },
  );

  await Activity.create([
    {
      userId: users[0]._id,
      type: 'run',
      durationMinutes: 35,
      calories: 420,
      date: new Date('2026-06-20'),
    },
    {
      userId: users[1]._id,
      type: 'cycling',
      durationMinutes: 45,
      calories: 510,
      date: new Date('2026-06-21'),
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 25,
      calories: 180,
      date: new Date('2026-06-22'),
    },
  ]);

  await Leaderboard.create([
    { userId: users[0]._id, points: 1420, streak: 7 },
    { userId: users[1]._id, points: 1285, streak: 5 },
    { userId: users[2]._id, points: 980, streak: 3 },
  ]);

  await Workout.create([
    {
      title: 'Morning Mobility Flow',
      focus: 'mobility',
      difficulty: 'easy',
      durationMinutes: 20,
      equipment: ['mat'],
    },
    {
      title: 'Interval Sprint Circuit',
      focus: 'cardio',
      difficulty: 'hard',
      durationMinutes: 30,
      equipment: ['timer'],
    },
    {
      title: 'Core Strength Builder',
      focus: 'strength',
      difficulty: 'medium',
      durationMinutes: 25,
      equipment: ['dumbbells'],
    },
  ]);

  console.log('Seed data inserted successfully');
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
