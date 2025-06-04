import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../../../dist/app/db/todo.json');

export const todosRouter = express.Router();

todosRouter.get('/', (req: Request, res: Response) => {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    console.log('From todos router');
    res.status(200).json({ message: 'From todos router', data });
});

todosRouter.get('/:title', (req: Request, res: Response) => {
    console.log('From query', req.query);
    console.log('From params', req.params);
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    res.status(200).json(data);
});

todosRouter.post('/create-todos', (req: Request, res: Response) => {
    const { title, body } = req.body;
    res.status(201).send({ title, body });
});
