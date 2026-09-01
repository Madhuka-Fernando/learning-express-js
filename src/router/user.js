//import userInfo from "../data/userInfo";
import { userInfo } from "../data/userInfo.js";
import prisma from "../db/db.js";

//router the user API endpoints
import { Router } from "express";
const userRouter = Router();

//get all user
userRouter.get("/all/", (_, res) => {
  res.status(200).json({
    msg: "All user data",
    data: userInfo,
  });
});

//get user by id

// /id/:id (that is the way to set path when method is req.params)
userRouter.get("/id", (req, res) => {
  //Get inputs(/api.../id?id=1)
  const { id } = req.query;
  if (id != undefined) {
    const user = userInfo.find((u) => u.id === parseInt(id));
    if (user) {
      res.status(200).json({
        msg: "User data",
        data: user,
      });
    } else {
      res.status(404).json({
        msg: "User not found",
      });
    }
  } else {
    res.status(400).json({
      msg: "Invalid user ID",
    });
  }
});

// create new user
userRouter.post("/create", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    //send data to DB
    const newUser = await prisma.User.create({
      data: user,
    });
    res.status(201).json({
      msg: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error creating user",
      error: error.message,
    });
  }
});

//export the user router
export default userRouter;
