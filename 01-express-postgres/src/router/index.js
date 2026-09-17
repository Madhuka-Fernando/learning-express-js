import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./product.js";
import testRouter from "./test.js";
import profileRouter from "./profile.js";
import categoryRouter from "./category.js";
import { checkAuth } from "../utils/authMiddleware.js";

const rootRouter = Router();

rootRouter.use("/v1/user", userRouter);
rootRouter.use("/v1/profile", profileRouter);
rootRouter.use("/v1/product", productRouter);
rootRouter.use("/v1/category", categoryRouter);
rootRouter.use("/v1/test", testRouter);

export default rootRouter;
