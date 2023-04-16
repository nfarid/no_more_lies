
import express, {Request, Response} from "express";
import {getAllAvailables, bookSlot, V4} from "../db/booking.js";
import { Schema, checkSchema, validationResult } from "express-validator";

const bookingRoute = express.Router();

const validateSchema : Schema = {
    "booking-email": {
        trim: true,
        notEmpty: {
            errorMessage: "Email is required",
        },
        isEmail: {
            errorMessage: "Email must be in a valid email format",
        }
    },
    "booking-id": {
        trim: true,
        notEmpty: {
            errorMessage: "Slot is required",
        },
        isUUID: {
            errorMessage: "Invalid slot",
        },
    },
};

//Index all available booking slots
bookingRoute.get("/", (_, res)=> {
    getAllAvailables()
        .then( slotLst=>{
            res.json(slotLst);
        }).catch( (err : Error) =>{
            console.error(err);
            res.status(500).send("Internal Server Error"); //http 500: Internal Server Error
        });
});

//Create a booked slot
bookingRoute.post("/",
    checkSchema(validateSchema),
    (req: Request, res: Response)=> {
        const err = validationResult(req);
        if(!err.isEmpty() )
            return res.status(422).json(err.array() ); //http 422: Unprocessable Content
        const email : string = req.body["booking-email"];
        const id = req.body["booking-id"] as V4;
        bookSlot(id, email)
            .then( ()=>{
                console.log("Commited result");
                res.status(201).send("Booked slot!"); //http 201: Created
            }).catch( (err: Error)=>{
                if(err.name == "DeleteError")
                    res.status(404).send("Booking slot no longer exist"); //http 404: Not Found
                console.error(err);
                res.status(500).send("Internal Server Error"); //http 500: Internal Server Error
            });
    });

export default bookingRoute;
