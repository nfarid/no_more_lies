
import express from "express";
const sessionRoute = express.Router();

import { verifyAccount } from "../db/account.js";

declare module "express-session" {
    interface SessionData {
        user : {id: number},
    }
}

const formSchema = {
    "user-email": {
        "type": "email",
    },
    "user-password": {
        "type": "password",
    },
};

//New session action
sessionRoute.get("/new", (_, res)=> {
    res.json(formSchema);
});

//Create session action
sessionRoute.post("/", async(req, res)=> {
    console.log(req.session);
    const email = req.body["user-email"];
    const password = req.body["user-password"];
    try{
        const user = await verifyAccount(email, password);
        if(user == null) {
            res.status(401).json({msg: "Invalid email or password", email: email}); //http 401: Unauthorized
        } else {
            req.session.user = user;
            res.send("login");
        }
    } catch(err: any) {
        console.log(err);
        res.status(500).send({"misc": "Unknown Database Error", code: err.code}); //http 500: Internal Server Error
    }
});

export default sessionRoute;
