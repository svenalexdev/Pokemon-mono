import { Router } from "express";
import {
    getBattleStats,
    createInitialStatsHandler,
} from "../controllers/battleHistories.js";
import validateBody from "../middlewares/validateBody.js";
import verifyToken from "../middlewares/verifyToken.js";
import { battleHistorySchema } from "../zod/schemas.js";

const battleHistoryRouter = Router();

battleHistoryRouter.route("/me").get(verifyToken, getBattleStats);
battleHistoryRouter.route("/init").post(verifyToken, createInitialStatsHandler);

export default battleHistoryRouter;
