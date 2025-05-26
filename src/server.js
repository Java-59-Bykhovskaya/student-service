import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { init } from './repository/studentRepository.js';

dotenv.config();
const app = express();
const port = 8080;
const dbName = 'java59';
const client = new MongoClient(process.env.MONGO_URI);

app.use(express.json());
app.use(studentRoutes);
app.use((req, res) => {
  res.status(404).type('text/plain').send('Not Found');
});

async function startServer () {
  try {
    await client.connect();
    const db = client.db(dbName);
    init(db);
    app.listen(port, () => {
      console.log(`Server started on port ${port}. Press Cntrl + C to finish.`);
    });
  } catch (err) {
    console.log('Failed to connect MondoDB ', err);
  }
}

startServer();

