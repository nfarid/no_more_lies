
import express, { Request, Response, NextFunction } from "express";
const userRouter = express.Router();

import {Schema, checkSchema, validationResult} from "express-validator";

import pool from "../db/pool.js";

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
            errorMessage: "Email must be a valid email",
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

userRouter.get("/new", (_, res, next)=> {
    res.json(formSchema);
});


userRouter.post("/new", 
    checkSchema(validateSchema),
    (req: Request, res: Response, next: NextFunction)=> {
        const err = validationResult(req);
        if(!err.isEmpty() )
            return res.status(422).json({ errors: err.array() }); //error 422: Unprocessable Content
        
        //TODO: Create account


        res.json({});
    });

export default userRouter;
