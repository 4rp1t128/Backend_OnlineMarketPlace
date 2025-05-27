import mongoose from "mongoose";

export const connectDB = (()=>{
    mongoose.connect(process.env.mongoDB_URI,{
        dbName:"OnlineMarketPlace",
    }).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log("Error While Connecting to DB:"+err.message);
    });
});