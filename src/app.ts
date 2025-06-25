import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

export default app;
