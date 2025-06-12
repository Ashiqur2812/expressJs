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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const filePath = path_1.default.join(__dirname, '../../../dist/app/db/todo.json');
exports.todosRouter = express_1.default.Router();
const todosCollection = mongodb_1.client.db('todosDB').collection('todos');
exports.todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cursor = yield todosCollection.find({}).toArray();
    res.status(200).json(cursor);
}));
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const todos = yield todosCollection.findOne(filter);
    res.status(200).json(todos);
}));
exports.todosRouter.post('/create-todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    yield todosCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const todos = yield todosCollection.find({}).toArray();
    res.status(201).json(todos);
}));
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const upsert = { upsert: true };
    const updatedTodo = {
        $set: {
            title,
            description,
            priority,
            isCompleted
        }
    };
    const result = yield todosCollection.updateOne(filter, updatedTodo, upsert);
    res.status(201).json(result);
}));
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    yield todosCollection.deleteOne(filter);
    res.status(200).json({ message: 'The todo is deleted successfully' });
}));
