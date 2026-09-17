//npm i express - To install express
//npm i -D nodemon - To automatically restart the server (write the script in package.json)
{
  /*
         "scripts": {
                "start": "node server.js",
                "dev": "nodemon server.js"
            }
    */
}
//npm i cookie-parser
//npm i express-session

import express from "express"; //import the express(like c# using system)
import cookieParser from "cookie-parser"; //import cookie-parser
import expressSession from "express-session"; // import express-session
import rootRouter from "./src/router/index.js"; //import routers
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./src/db/db.js";
const app = express(); //create an instance of express (Execute express)

//get request from user and send response(HTML)
app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Hello World</h1>");
});

//get request from user and send response(JSON)
app.get("/test1", (req, res) => {
  console.log(req);
  res.json({ message: "Hello World JSON" });
});

//Set the json middleware
app.use(express.json());

// Cookie Parser
app.use(cookieParser("myKey"));

// Express Session
app.use(
  expressSession({
    secret: "myKey",
    resave: false, // if session is expired auto change the session ID (After every 30 sec)
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 30,
      httpOnly: true,
      signed: true,
    },
    // set up prisma session store
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

//Routers
app.use("/api", rootRouter);

//set server listening port
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
