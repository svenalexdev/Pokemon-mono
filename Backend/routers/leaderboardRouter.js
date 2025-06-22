import { Router } from "express";
import {
    getLeaderboard,
    createLeaderboardEntry,
} from "../controllers/leaderboardEntries.js";
import { leaderboardSchema } from "../zod/schemas.js";
import validateBody from "../middlewares/validateBody.js";

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(getLeaderboard);
leaderboardRouter
    .route("/")
    .post(validateBody(leaderboardSchema), createLeaderboardEntry);

export default leaderboardRouter;
