
import express from "express";

import indexRoute from "./routes/index.js";

const app = express();

app.use("/_api", indexRoute);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listening on PORT ${port}`);
});
