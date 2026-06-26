"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await activity_1.Activity.find().sort({ date: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = await activity_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to log activity' });
    }
});
exports.default = router;
