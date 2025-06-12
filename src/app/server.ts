import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import { client } from "./config/mongodb";
const port = 5000;

let server;

const bootstrap = async () => {
    await client.connect();
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

bootstrap();