import express from "express";
import { getUser, postUser } from "../controller/user.js";

const userRouter = express.Router();

userRouter.get("/getUser", getUser);
userRouter.post("/postUser", postUser);

export default userRouter;
