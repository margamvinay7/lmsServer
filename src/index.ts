import express, { Express } from "express";
import "dotenv/config";
import videoRouter from "./routes/videoRouter";

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/video", videoRouter);

app.listen(3001, () => {
  console.log("in server port", 3000);
});
