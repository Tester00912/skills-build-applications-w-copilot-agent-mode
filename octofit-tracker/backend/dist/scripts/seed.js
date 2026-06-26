"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const teamAlpha = await team_1.Team.create({
        name: 'Alpha Squad',
        sport: 'CrossFit',
        members: [],
    });
    const teamBeta = await team_1.Team.create({
        name: 'Beta Crew',
        sport: 'Cycling',
        members: [],
    });
    const users = await user_1.User.create([
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
    await team_1.Team.updateMany({}, { $set: { members: users.map((user) => user._id) } });
    await activity_1.Activity.create([
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
    await leaderboard_1.Leaderboard.create([
        { userId: users[0]._id, points: 1420, streak: 7 },
        { userId: users[1]._id, points: 1285, streak: 5 },
        { userId: users[2]._id, points: 980, streak: 3 },
    ]);
    await workout_1.Workout.create([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
