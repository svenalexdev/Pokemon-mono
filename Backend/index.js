import "./db/index.js";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "process.env.SPA_ORIGIN, credentials: true" }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("*splat", (req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

app.listen(port, () =>
    console.log(`Server listening on htt://localhost:${port}`)
);
