"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = require("../models/leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const entries = await leaderboard_1.Leaderboard.find().populate('userId', 'name username').sort({ points: -1 }).lean();
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
exports.default = router;
