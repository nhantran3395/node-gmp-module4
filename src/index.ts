import express from "express";
import { userRouter } from "./routes";
import Logger from "./logger";
import { errorHandlingMiddleware, morganMiddleware } from "./middlewares";

const app = express();
const port = process.env.APPLICATION_PORT_TASK1 ?? 3002;

app.use(express.json());
app.use(morganMiddleware);

app.get("/", function (req, res) {
  res.json({ message: "module 3 application is running" });
});

app.use("/users", userRouter);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  Logger.info(`server started on port ${port}`);
});
