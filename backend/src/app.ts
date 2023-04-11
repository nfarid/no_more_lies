

import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";

import indexRoute from "./routes/index.js";
import userRouter from "./routes/user.js";



const app = express();

//req.body will be empty without this
app.use(express.json() );
app.use(express.urlencoded({extended: true}) );

app.use("/_api", indexRoute);
app.use("/_api/users", userRouter);

app.use( (err: Error, req : Request, res : Response, _: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!"); //error 500: Internal Server Error
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listening on PORT ${port}`);
});
