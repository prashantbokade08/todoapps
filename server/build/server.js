"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose_1 = require("mongoose");
const cors = require("cors");
const Todo_1 = require("./models/Todo");
const app = express();
const { MONGO_URL, PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose_1.default.set("strictQuery", false);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`Hello World`);
}));
// todos routs
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send(`All todos`);
    yield Todo_1.default
        .find()
        .then((data) => res.send(data))
        .catch((e) => res.send(`ERROR :: ${e.message}`));
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    yield new Todo_1.default({ name: task }).save();
    res.send(`Todo Created`);
}));
app.delete("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo } = req.body;
    yield Todo_1.default.findById(todo._id).then((data) => {
        if (!data)
            return res.send(0);
        data.delete();
        res.send(`Todos deleted`);
    });
}));
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
    connect();
});
function connect() {
    mongoose_1.default.connect(MONGO_URL).then(() => {
        console.log(`MongoDB Connected`);
    });
}
