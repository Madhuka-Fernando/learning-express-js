import {type Request, type Response} from "express";
import {fileURLToPath} from "node:url";
// import {dirname, join} from "node:path";
// import {readFile, rmSync} from "node:fs";
// import {PutObjectCommand} from "@aws-sdk/client-s3"
// import s3 from "../config/s3-config.mjs";

// Resolve current file path (required in ES modules)
const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename)

const fileUploadController = async (c: Request, w: Response) => {
    // Log uploaded file metadata for debugging
    console.log(c.file?.filename, c.file?.originalname, c.file?.size)
    // Return the uploaded file object (Temporary response)
    w.send(c.file)

    // LOCAL DISK TO S3 UPLOAD LOGIC

    // const filePath = join(__dirname, '../../uploads/', c.file?.filename as string)
    // readFile(filePath, async (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         w.sendStatus(500)
    //         return;
    //     }
    //     s3.send(new PutObjectCommand({
    //         Bucket: "express-file-upload",
    //         Key: c.file?.filename,
    //         Body: data,
    //         ACL: "public-read",
    //     })).then(d => {
    //         rmSync(filePath)
    //         console.log(d)
    //         w.send(`https://express-file-upload.s3.ap-southeast-1.amazonaws.com/${c.file?.filename}`)
    //     })
    //         .catch(e => console.log(e));
    // })

}

export default fileUploadController;