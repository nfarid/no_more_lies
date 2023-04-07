
import express from "express";

const app = express();


app.get("/", (_, res)=>{
    res.send("Hello from express and typescript\n");
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listening on PORT ${port}`);
});
