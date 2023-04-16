
import express from "express";
import {getAllAvailables, bookSlot} from "../db/booking.js";

const bookingRoute = express.Router();

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

bookingRoute.post("/", (req, res)=> {
    // if(!req.body["booking-email"] || !req.body["booking-slot"])
    //     return res.status(400).send("Need email and slot"); //http 400: Bad Request
    // const email : string = req.body["booking-email"];
    // const slot = new Date(req.body["booking-slot"]);
    // bookSlot(slot, email)
    //     .then( ()=>{
    //         console.log("Commited result");
    //         res.status(201).send("Booked slot!");
    //     }).catch( (err: Error)=>{
    //         if(err.name == "DeleteError")
    //             res.status(404).send("Booking slot no longer exist"); //http 404: Not Found
    //         console.error(err);
    //         res.status(500).send("Internal Server Error"); //http 500: Internal Server Error
    //     });
});

export default bookingRoute;
