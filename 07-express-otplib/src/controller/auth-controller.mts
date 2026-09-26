import {type Request, type Response} from "express";
import authService from "../service/auth-service.mjs";
import {toDataURL} from "qrcode";

export const checkAuth = (c: Request, w: Response) => {
    w.send("Working ...")
}

// Generates a 2FA QR code image and sends it to the client
const requestQR = (c: Request<{}, {}, { userId: string }>, w: Response) => {
    const authURL = authService.getAuthURL(c.body.userId)
    toDataURL(authURL, (error, url) => {
        if (error) {
            w.status(500).send({msg: 'Internal Server Error'})
            console.log(error);
            return;
        }
        w.send(url)
    })
}

// Verifies the user's OTP code and returns the auth status
const totpVerify = async (c: Request<{}, {}, { otpCode: string, userId: string }>, w: Response) => {
    const {otpCode, userId} = c.body
    const isVerify = await authService.verifyToken(otpCode, userId)
    if (isVerify) {
        w.send("Verify token")
    }
    w.status(500).send({msg: 'Internal Server Error'})
}

export default {
    requestQR,
    totpVerify,
}