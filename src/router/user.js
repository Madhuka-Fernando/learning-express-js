//import userInfo from "../data/userInfo";
import { matchedData, validationResult } from "express-validator";
import prisma from "../db/db.js";

import { registerValidate, commonValidate } from "../utils/validatorMethod.js";
import { resError } from "../utils/error-creater.js";

import { tokenGen, tokenDecode } from "../utils/jwt.js";

//router the user API endpoints
import { Router } from "express";
import { checkAuth } from "../utils/authMiddleware.js";
const userRouter = Router();

//get all user
userRouter.get("/all", async (_, res) => {
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

// Get user profile by UserId
userRouter.get("/profile/:UserId", async (req, res) => {
  const { UserId } = req.params;
  try {
    const user = await prisma.User.findUnique({
      select: {
        Profile: {
          select: {
            Img: true,
          },
        },
      },
      where: {
        Id: parseInt(UserId),
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

// Get user product by UserId
userRouter.get("/product/:UserId", async (req, res) => {
  const { UserId } = req.params;
  try {
    const user = await prisma.User.findUnique({
      select: {
        Product: {
          select: {
            Name: true,
            ProductCategory: {
              select: {
                Name: true,
              },
            },
          },
        },
      },
      where: {
        Id: parseInt(UserId),
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
//user Registration
userRouter.post("/register", registerValidate, async (req, res) => {
  const errors = validationResult(req);
  const err = resError(errors.array());
  // Check for validation errors and display them
  if (errors.array().length) {
    return res.status(400).json({
      msg: "Validation errors",
      error: err,
      data: null,
    });
  }
  // assign matched data to a variable
  const data = matchedData(req);
  try {
    // pass the matched data to the database
    await prisma.user.create({ data });
    return res.status(201).json({
      msg: "User created successfully",
      data: null,
    });
  } catch (error) {
    // Handle database errors
    console.log(error);
    if (error.code === "P2002") {
      res.status(500).json({
        msg: "Error",
        error: "User Name already exists",
        data: null,
      });
    }
    res.status(500).json({
      msg: "Error",
      error: "Database Error",
      data: null,
    });
  }
});

//User Login
userRouter.post(
  "/login",
  commonValidate("UserName", "Password"),
  async (req, res) => {
    const errors = validationResult(req);
    const err = resError(errors.array());

    if (errors.array().length) {
      return res.status(400).json({
        msg: "Validation errors",
        error: err,
        data: null,
      });
    }

    const data = matchedData(req);

    try {
      const user = await prisma.user.findUnique({
        where: { UserName: data.UserName },
      });
      if (user !== null) {
        if (user.Password === data.Password) {
          // Generate JWT token
          const payload = {
            UserName: user.UserName,
          };
          const token = tokenGen(payload);
          return res.status(200).json({
            msg: "Success",
            data: user,
            token,
          });
        }
        return res.status(400).json({
          msg: "Errors",
          error: "Password is incorrect",
          data: null,
        });
      }
      return res.status(404).json({
        msg: "Errors",
        error: "User not found",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error",
        error: "DataBase Error",
        data: null,
      });
    }
  },
);

// Check token decoding
userRouter.post("/check-token", async (req, res) => {
  const token = req.body.token; // assuming token is sent in the body
  console.log(tokenDecode(token));
  return res.status(200).json({
    msg: "Success",
    data: tokenDecode(token),
  });
});

// Verify JWT token using middleware
userRouter.post("/verify-token", checkAuth, (req, res) => {
  return res.status(200).json({
    msg: "Success",
    data: "Token Verified",
  });
});

//export the user router
export default userRouter;
