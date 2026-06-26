"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await user_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await user_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
exports.default = router;
