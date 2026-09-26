import express from 'express';
import rootRouter from "./router/index.mjs";

const app = express();

app.use(express.json());

app.use("/api/v1",rootRouter)

app.listen(4000, () => {
    console.log("Server running on port 4000");
})

export default app;