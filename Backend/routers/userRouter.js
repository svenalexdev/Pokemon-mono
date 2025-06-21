import { Router } from "express";
import {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/users.js";
import validateBody from "../middlewares/validateBody.js";
import { userSchema } from "../zod/schemas";

const userRouter = Router();

userRouter.route("/").get(getUsers).post(validateBody(userSchema), createUser);
userRouter
    .route("/:id")
    .get(getUserById)
    .put(validateBody(userSchema), updateUser)
    .delete(deleteUser);

export default userRouter;
