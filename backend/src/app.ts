

import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";

import indexRoute from "./routes/index.js";
import sessionRoute from "./routes/session.js";
import userRouter from "./routes/user.js";

import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool.js";

const app = express();

const oneDay = 24 * 60 * 60 * 1000; //a day in milliseconds
const PostgresqlStore = connectPgSimple(expressSession);
const sessionStore = new PostgresqlStore({pool});
//TODO: Change these options
const sessionOptions : expressSession.SessionOptions = {
    secret: process.env.SESSION_SECRET || "",
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: oneDay,
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
};
const session = expressSession(sessionOptions);
app.use(session);


//req.body will be empty without this
app.use(express.json() );
app.use(express.urlencoded({extended: true}) );

app.use("/_api", indexRoute);
app.use("/_api/users", userRouter);
app.use("/_api/sessions", sessionRoute);

app.use( (err: Error, req : Request, res : Response, _: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!"); //error 500: Internal Server Error
});


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listening on PORT ${port}`);
});
