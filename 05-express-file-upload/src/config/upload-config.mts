import multer, {diskStorage} from "multer";
import {type Request} from "express";
import {extname} from "node:path"
import multerS3 from "multer-s3"
import s3 from "./s3-config.mjs";

// Configuration for saving files locally on the hard disk
const storage = diskStorage({
    destination: "uploads", // Folder where local files will be saved
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        console.log(file.originalname, file.filename, file.size, file.mimetype)
        // Generate a unique filename using the current timestamp to prevent overwriting
        const fileName = Date.now().toString() + extname(file.originalname);
        callback(null, fileName);
    }
})

// Configuration for directly uploading files to AWS S3
const storage2 = multerS3({
    s3, // The configured S3 client
    bucket: "express-file-upload",
    acl: "public-read", // Makes the uploaded file publicly accessible via URL
    key(_: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        console.log(file.originalname, file.filename, file.size, file.mimetype);
        // Generate a unique key (filename) for the S3 object
        const fileName = Date.now().toString() + extname(file.originalname);
        callback(null, fileName);
    }
})

// Initialize the Multer middleware
const upload = multer({
    storage: storage2, // Currently set to use S3 storage
    limits: {
        fileSize: 1024 * 1024 // Restrict uploaded file size to a maximum of 1MB
    }
})


export default upload;