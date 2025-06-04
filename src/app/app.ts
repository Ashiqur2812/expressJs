import express, { Application, Request, Response } from 'express';
import { todosRouter } from './todos/todos.routes';
const app: Application = express();

app.use(express.json());

const userRouter = express.Router();

app.use('/todos', todosRouter);
app.use('/users', userRouter);


// app.get('/todos', (req: Request, res: Response) => {
//     const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
//     console.log('From app router');
//     res.status(200).json({ message: 'Data is here', data });
// });

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Todos App');
});

// app.get('/todos/:title', (req: Request, res: Response) => {
//     console.log('From query', req.query);
//     console.log('From params', req.params);
//     const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
//     res.status(200).json(data);
// });

export default app;
