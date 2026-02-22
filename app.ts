import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cors from "cors";

dotenv.config();

const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    console.log("CORS origin:", origin);

    if (whitelist.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
}));

app.use('/api/v1', routes);

export default app;