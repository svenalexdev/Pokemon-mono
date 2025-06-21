import Leaderboard from "../models/Leaderboard";
import { isValidObjectId } from "mongoose";

const getLeaderboard = async (req, res) => {
    const topPlayers = await Leaderboard.find()
        .sort({ winningStreak: -1, createdAt: 1 })
        .limit(10);
    res.json(topPlayers);
};

const createLeaderboardEntry = async (req, res) => {}