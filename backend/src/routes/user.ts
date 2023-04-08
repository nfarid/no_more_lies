
import express from "express";
const userRouter = express.Router();

userRouter.get("/new", (_, res)=> {
    res.json({
        "user-email": {
            "type": "email",
        },
        "user-password": {
            "type": "password",
            "minlength": 8,
        },
    });
});

export default userRouter;
