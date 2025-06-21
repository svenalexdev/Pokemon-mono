import { Router } from "express";
import { signup, signin, me, signout } from "../controllers/auth.js";
import validateBody from "../middlewares/validateBody.js";
import verifyToken from "../middlewares/verifyToken.js";
import { userSchema, signInSchema } from "../zod/schemas.js";

const authRouter = Router();

authRouter.route("/signup").post(validateBody(userSchema), signup);
authRouter.route("/signin").post(validateBody(signInSchema), signin);
authRouter.route("/me").get(verifyToken, me);
authRouter.route("/signout").delete(signout);

export default authRouter;
