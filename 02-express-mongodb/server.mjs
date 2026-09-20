import "dotenv/config";
import express, { json } from "express";
import dbconnect from "./src/db/config.mjs";
import rootRouter from "./src/routes/index.mjs";

console.log(process.env.PORT);

const app = express();
const PORT = process.env.PORT || 4001;

app.use(json());

// Route Connect
app.use("/api/v1", rootRouter);

dbconnect
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running ... on PORT ${PORT}`),
    );
  })
  .catch((e) => {
    console.log(e);
  });
