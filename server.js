import express from 'express';
import { connectDB } from './config/database.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
const app = express();
config({
  path: "./config/config.env",
});

connectDB();

//Middlewares
app.use(express.json());
app.use(cookieParser());


//Routes
app.use("/api/v1/users", userRouter);



app.listen(process.env.PORT,(err) => {
    if (err) {
        console.log("Error While Connecting to Server....",err);
        return;
    }
    console.log(`Connected to Server on Port ${process.env.PORT}....`);
});