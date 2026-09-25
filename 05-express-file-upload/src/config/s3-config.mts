import {S3Client} from "@aws-sdk/client-s3"
import dotenv from "dotenv";

dotenv.config();  // Load environment variables from .env file

// Initialize AWS S3 client with secure credentials
const s3 = new S3Client({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
})

export default s3;