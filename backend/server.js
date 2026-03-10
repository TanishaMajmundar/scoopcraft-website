import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import flavorRoutes from "./routes/flavorRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("API running");
});

app.use("/api/flavors", flavorRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port", process.env.PORT);
});