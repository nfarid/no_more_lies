
import express, { Request, Response, } from "express";
const userRouter = express.Router();

import {Schema, checkSchema, validationResult} from "express-validator";

import {createAccount} from "../db/account.js";

const formSchema = {
    "user-email": {
        "type": "email",
    },
    "user-password": {
        "type": "password",
        "minlength": 8,
        "maxlength": 64,
    },
};

const validateSchema : Schema = {
    "user-email": {
        trim: true,
        notEmpty: {
            errorMessage: "Email is required",
        },
        isEmail: {
            errorMessage: "Email must be in a valid email format",
        }
    },
    "user-password": {
        trim: true,
        notEmpty: {
            errorMessage: "Password is required",
        },
        isLength: {
            errorMessage: "Password must be between 6 and 72 character",
            options: {
                min: 6,
                max: 72,
            }
        }
    }
};

function createErrorMap(req: Request) {
    const validationErrors = validationResult(req);
    if(validationErrors.isEmpty() )
        return null;
    const errorMp : Record<string, Array<string> > = {};
    for(const err of validationErrors.array() ) {
        const [k,v] = [err.param, String(err.msg)];
        if(! (k in errorMp) )
            errorMp[k] = [];
        errorMp[k].push(v);
    }
    return errorMp;
}

//New user action
userRouter.get("/new", (_, res)=> {
    res.json(formSchema);
});

//Create user action
userRouter.post("/",
    checkSchema(validateSchema),
    async (req: Request, res: Response)=> {
        const errMp = createErrorMap(req);
        if(errMp) {
            console.error(errMp);
            return res.status(422).json({errors: errMp}); //http 422: Unprocessable Content
        }
        try {
            const email = req.body["user-email"];
            const password = req.body["user-password"];
            const id = await createAccount(email, password);
            res.status(201).json({id: id}); //http 201: Created
        } catch(err: any) {
            console.error(err);
            if(err.code == "23505") //postgres 23505: unique key violation
                res.status(409).send({"user-email": "User already exist"}); //http 409: Conflict
            else
                res.status(500).send({"misc": "Unknown Database Error", code: err.code}); //http 500: Internal Server Error
        }
    } );

export default userRouter;
