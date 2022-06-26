import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Route files
import courses from './routes/courses.js';

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());

// Mount routes
app.use('/api/v1/courses', courses);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
