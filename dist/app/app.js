"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use('/todos', todos_routes_1.todosRouter);
app.use('/users', userRouter);
// app.get('/todos', (req: Request, res: Response) => {
//     const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
//     console.log('From app router');
//     res.status(200).json({ message: 'Data is here', data });
// });
app.get('/', (req, res) => {
    res.send('Welcome to Todos App');
});
// app.get('/todos/:title', (req: Request, res: Response) => {
//     console.log('From query', req.query);
//     console.log('From params', req.params);
//     const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
//     res.status(200).json(data);
// });
exports.default = app;
