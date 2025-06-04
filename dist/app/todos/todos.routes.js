"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '../../../dist/app/db/todo.json');
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    console.log('From todos router');
    res.status(200).json({ message: 'From todos router', data });
});
exports.todosRouter.get('/:title', (req, res) => {
    console.log('From query', req.query);
    console.log('From params', req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    res.status(200).json(data);
});
exports.todosRouter.post('/create-todos', (req, res) => {
    const { title, body } = req.body;
    res.status(201).send({ title, body });
});
