import {Router} from 'express';
import authController, {checkAuth} from "../controller/auth-controller.mjs";


const authRouter = Router();

authRouter.get("/", checkAuth);
authRouter.post("/request-totp",authController.requestQR)
authRouter.post("/request-verify",authController.totpVerify);


export default authRouter;