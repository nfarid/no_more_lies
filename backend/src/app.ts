
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import indexRoute from "./routes/index.js";
import userRouter from "./routes/user.js";



const app = express();

app.use("/_api", indexRoute);
app.use("/_api/user", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listening on PORT ${port}`);
});
