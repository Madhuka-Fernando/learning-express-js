import {Router,type Request,type Response} from "express";
import userController from "../controller/user-controller.mjs";

const userRouter = Router();

userRouter.get("/all",userController.getUser)

export default userRouter;