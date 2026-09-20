import { Router } from "express";
import User from "../model/user.mjs";

const userRouter = Router();

// c - Contex , w - Response Writer
userRouter.post("/", async (c, w) => {
  const data = c.body;
  try {
    const newUser = await User.create(data);
    return w.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server Error");
  }
});

// get all users
userRouter.get("/", async (c, w) => {
  try {
    const users = await User.find();
    return w.status(200).send(users);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

// get user by id
userRouter.get("/:id", async (c, w) => {
  const id = c.params.id;
  try {
    const user = await User.findOne({ _id: id });
    return w.status(200).send(user);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

export default userRouter;
