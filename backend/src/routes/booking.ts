
import express from "express";
import {getAllAvailables} from "../db/booking.js";

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

export default bookingRoute;
