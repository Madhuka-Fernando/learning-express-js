//import userInfo from "../data/userInfo";
import prisma from "../db/db.js";

//router the user API endpoints
import { Router } from "express";
const userRouter = Router();

//get all user
userRouter.get("/all/", async (_, res) => {
  try {
    const users = await prisma.User.findMany();
    res.status(200).json({
      msg: "All user data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error fetching user data",
      error: error.message,
    });
  }
});

//get user by id

// /id/:id (that is the way to set path when method is req.params)
userRouter.get("/id", async (req, res) => {
  //Get inputs(/api.../id?id=1)
  const { id } = req.query;
  try {
    const user = await prisma.User.findUnique({
      where: {
        Id: parseInt(id),
      },
    });
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error fetching user data",
      error: error.message,
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

//update user data
userRouter.put("/update", async (req, res) => {
  const { id } = req.query;
  const userData = req.body;
  try {
    const updatedUser = await prisma.User.update({
      where: {
        Id: parseInt(id),
      },
      data: userData,
    });
    res.status(200).json({
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error updating user",
      error: error.message,
    });
  }
});

//delete user
userRouter.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    const deletedUser = await prisma.User.delete({
      where: {
        Id: parseInt(id),
      },
    });
    res.status(200).json({
      msg: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error deleting user",
      error: error.message,
    });
  }
});

//export the user router
export default userRouter;
