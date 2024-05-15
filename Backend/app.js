import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user_routes.js";
import Blogrouter from "./routes/blog_routes.js";
import cors from 'cors'
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", Blogrouter);


mongoose.connect(
    "mongodb+srv://nirupamblog:niru1234@cluster0.duj70fi.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=>app.listen(5000)).then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err))

// nirupamblog
// niru1234

