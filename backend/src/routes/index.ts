
import express from "express";
const indexRoute = express.Router();

indexRoute.get("/", (_, res)=>{
    res.json({
        message: "Hello from express and typescript",
    });
});

export default indexRoute;
