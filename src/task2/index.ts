import express from "express";
import { userRouter } from "./routes";
import Logger from "./logger";
import { morganMiddleware } from "./middlewares";

const app = express();
const port = process.env.APPLICATION_PORT_TASK1 ?? 3002;

app.use(express.json());
app.use(morganMiddleware);

app.get("/", function (req, res) {
  res.json({ message: "task2 is running" });
});

app.use("/user", userRouter);

app.listen(port, () => {
  Logger.info(`server started at http://localhost:${port}`);
});
