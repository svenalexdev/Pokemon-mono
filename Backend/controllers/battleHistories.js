import { isValidObjectId } from "mongoose";
import BattleHistory from "../models/BattleHistory.js";

const getBattleStats = async (req, res) => {};
const stats = await BattleHistory.findOne({ userId: req.user.id });

// const updateBattleStats = async (req, res) => {};
// // z.B. totalBattles++, battlesWon++, bestStreak

const createInitialStats = async (req, res) => {};
// bei Registrierung einmalig anlegem (ggfs. direkt in signUp)

// After fight finished in battle logic: update BattleHistory and Leaderboard --> battle.js controller
