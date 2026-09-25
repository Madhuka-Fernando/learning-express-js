import express from 'express';
import rootRouter from "./router/index.mjs";
import fileUploadRouter from "./router/file-upload.mjs";

const app = express();

app.use(express.json());

app.use("/api/v1/", rootRouter)
app.use("/api/image", express.static("uploads")); // Serve static files from the 'uploads' directory

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

export default app;