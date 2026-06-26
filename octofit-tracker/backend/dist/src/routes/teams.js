"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await team_1.Team.find().populate('members', 'name username').lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
router.post('/', async (req, res) => {
    try {
        const team = await team_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
exports.default = router;
