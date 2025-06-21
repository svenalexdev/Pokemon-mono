import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboardEntries.js";
import { leaderboardSchema } from "../zod/schemas";

const leaderboardRouter = Router();

leaderboardRouter.route("/leaderboard").get(getLeaderboard);

export default leaderboardRouter;
