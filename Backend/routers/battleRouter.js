import { Router } from "express";
import {
    getBattleStats,
    createInitialStatsHandler,
} from "../controllers/battleHistories.js";
import validateBody from "../middlewares/validateBody.js";
import { battleHistorySchema } from "../zod/schemas.js";

const battleHistoryRouter = Router();

battleHistoryRouter.route("/me").get(getBattleStats);
battleHistoryRouter
    .route("/init")
    .post(validateBody(battleHistorySchema), createInitialStatsHandler);

export default battleHistoryRouter;
