import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("! ==> Welcome to the Booking Service <== !");
});

export default app;
