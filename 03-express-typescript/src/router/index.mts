import {Router,type Request,type Response} from "express";
import userRouter from "./user.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);

rootRouter.get("/", (_:Request, w:Response) => {
    w.send("Hello World!");
})

export default rootRouter;