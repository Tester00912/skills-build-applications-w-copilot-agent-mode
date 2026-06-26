"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const config_1 = require("./config");
const database_1 = require("../database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl: (0, config_1.getApiBaseUrl)() });
});
(0, database_1.connectToDatabase)()
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${(0, config_1.getApiBaseUrl)()}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
