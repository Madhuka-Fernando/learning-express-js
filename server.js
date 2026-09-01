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

import express from "express"; //import the express(like c# using system)
import UserRouter from "./src/router/user.js"; //import routers
import ProductRouter from "./src/router/product.js"; //import routers
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

//Routers
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);

//set server listening port
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
