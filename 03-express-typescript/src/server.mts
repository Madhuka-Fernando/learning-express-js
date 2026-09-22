import express from 'express';
import rootRouter from "./router/index.mjs";

const app = express();

app.listen(8080, () => console.log('server running on port 8080'));

//MIDDLEWARE
app.use(express.json());

//ROUTERS
app.use("/api/v1",rootRouter)