//import userInfo from "../data/userInfo";
import { userInfo } from "../data/userInfo.js";

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

//export the user router
export default userRouter;
