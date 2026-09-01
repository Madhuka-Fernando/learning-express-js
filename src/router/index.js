import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";
import testRouter from "./test.js";

const rootRouter = Router();

rootRouter.use("/v1/user", userRouter);
rootRouter.use("/v1/product", productRouter);
rootRouter.use("/v1/test", testRouter);

export default rootRouter;
