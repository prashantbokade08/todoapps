import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import type { Response, Request } from "express";
import mongoose from "mongoose";
import * as cors from "cors";
import todoModel from "./models/Todo";
const app = express();

const { MONGO_URL, PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose.set("strictQuery", false);

app.get("/", async (req: Request, res: Response) => {
  res.send(`Hello World`);
});

// todos routs
app.get("/todos", async (req: Request, res: Response) => {
  // res.send(`All todos`);
  await todoModel
    .find()
    .then((data) => res.send(data))
    .catch((e) => res.send(`ERROR :: ${e.message}`));
});

app.post("/todos", async (req: Request, res: Response) => {
  const { task } = req.body;
  await new todoModel({ name: task }).save();
  res.send(`Todo Created`);
});

app.delete("/todos", async (req: Request, res: Response) => {
  const { todo } = req.body;
  await todoModel.findById(todo._id).then((data) => {
    if (!data) return res.send(0);
    data.delete();
    res.send(`Todos deleted`);
  });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
  connect();
});

function connect() {
  mongoose.connect(MONGO_URL).then(() => {
    console.log(`MongoDB Connected`);
  });
}
