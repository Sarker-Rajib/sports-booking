import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("! ==> Welcome to the Booking Service <== !");
});
app.use("/api", router);

// specified error handler
app.use(globalErrorHandler);
// not found handler
app.use(notFound);

export default app;
