import { model, Schema, models } from "mongoose";

const todoSchema = new Schema({
  name: String,
  done: Boolean,
});

const todoModel = model("Todo", todoSchema);

export default todoModel;
