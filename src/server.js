import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = 8080;
const dbName = 'java59';

app.use(express.json());
app.use(studentRoutes);
app.use((req, res) => {
  res.status(404).type('text/plain').send('Not Found');
});

async function startServer () {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: dbName });
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server started on port ${port}. Press Cntrl + C to finish.`);
    });
  } catch (err) {
    console.log('Failed to connect MondoDB ', err);
  }
}

startServer();

