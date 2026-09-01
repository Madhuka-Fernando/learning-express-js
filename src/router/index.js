import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";

const rootRouter = Router();

rootRouter.use("/v1/user", userRouter);
rootRouter.use("/v1/product", productRouter);

export default rootRouter;
