import { isValidObjectId } from "mongoose";
import BattleHistory from "../models/BattleHistory.js";
import User from "../models/User.js";

const getBattleStats = async (req, res) => {
    const stats = await BattleHistory.findOne({ userId: req.userId });
    if (!stats) throw new Error("Battle stats not found", { cause: 404 });
    res.json(stats);
};

// const updateBattleStats = async (req, res) => {};
// z.B. totalBattles++, battlesWon++, bestStreak will be done in extra controller battle.js

// internal helper function (no CRUD) to set initial stats, will be called in signup
const createInitialStats = async (userId) => {
    if (!isValidObjectId(userId))
        throw new Error("Invalid user ID", { cause: 400 });

    const user = await User.findById(userId);
    if (!user)
        throw new Error("Cannot create battle history: user not found", {
            cause: 404,
        });

    const found = await BattleHistory.findOne({ userId });
    if (found) throw new Error("Stats already exist", { cause: 400 });

    await BattleHistory.create({ userId });
};

const createInitialStatsHandler = async (req, res) => {
    await createInitialStats(req.userId);
    res.status(201).json({ message: "Initial stats created" });
};

export { getBattleStats, createInitialStats, createInitialStatsHandler };
