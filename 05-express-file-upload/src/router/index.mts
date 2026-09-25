import {Router,type Request,type Response} from "express";
import fileUploadRouter from "./file-upload.mjs";

const rootRouter = Router();

rootRouter.use("/file", fileUploadRouter);

rootRouter.get('/', (_:Request, w:Response) => {
    w.sendStatus(200)
})

export default rootRouter;