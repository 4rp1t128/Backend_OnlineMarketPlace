import express from 'express';
import { connectDB } from './config/database.js';
import { config } from 'dotenv';
const app = express();
config({
  path: "./config/config.env",
});

connectDB();

app.listen(process.env.PORT,(err) => {
    if (err) {
        console.log("Error While Connecting to Server....",err);
        return;
    }
    console.log(`Connected to Server on Port ${process.env.PORT}....`);
});