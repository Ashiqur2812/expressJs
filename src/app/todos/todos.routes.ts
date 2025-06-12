import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { client } from '../config/mongodb';
import { ObjectId } from 'mongodb';

const filePath = path.join(__dirname, '../../../dist/app/db/todo.json');

export const todosRouter = express.Router();

const todosCollection = client.db('todosDB').collection('todos');

todosRouter.get('/', async (req: Request, res: Response) => {
    // const db = await client.db('todosDB');
    // const collection = await db.collection('todos');

    const cursor = await todosCollection.find({}).toArray();
    res.status(200).json(cursor);
});

todosRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const todos = await todosCollection.findOne(filter);
    res.status(200).json(todos);
});

todosRouter.post('/create-todos', async (req: Request, res: Response) => {
    const { title, description, priority } = req.body;

    await todosCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });

    const todos = await todosCollection.find({}).toArray();
    res.status(201).json(todos);
});

todosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new ObjectId(id) };
    const upsert = { upsert: true };
    const updatedTodo = {
        $set: {
            title,
            description,
            priority,
            isCompleted
        }
    };
    const result = await todosCollection.updateOne(filter, updatedTodo, upsert);
    res.status(201).json(result);
});

todosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    await todosCollection.deleteOne(filter);
    res.status(200).json({ message: 'The todo is deleted successfully' });
});
