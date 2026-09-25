import {Router, type Request, type Response} from "express";
import upload from "../config/upload-config.mjs";
import fileUploadController from "../controller/file-upload-controller.mjs";

const fileUploadRouter = Router();

// Handle POST request for a single image upload using Multer middleware
fileUploadRouter.post("/", upload.single("image"), fileUploadController)

export default fileUploadRouter;