import { Router } from "express";
import User from "../model/user.mjs";
import Profile from "../model/profile.mjs";

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

//update user profile
userRouter.put("/profile/:userId", async (c, w) => {
  const { img } = c.body;
  try {
    const updatedUser = await User.findById(c.params.userId); // get user by ID
    const profile = await Profile.create({ user: updatedUser._id, img }); // create new profile linked to user
    updatedUser.profile = profile._id; // assign profile ID to user
    await updatedUser.save(); // save updated user to DB

    console.log(profile);
    console.log(updatedUser);

    w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

// get profile by id
userRouter.get("/profile/:userId", async (c, w) => {
  try {
    const user = await User.findById(c.params.userId)
      .populate("profile", "img createdAt") // Show only img and created at in profile section
      .select(["profile", "userName", "name"]); // Show only selected fields
    return w.status(200).send(user);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//delete profile using profile id
userRouter.delete("/profile/:profileId", async (c, w) => {
  const profileId = c.params.profileId;
  try {
    // await User.updateOne({ profile: profileId }, { profile: null });
    await Profile.deleteOne({ _id: profileId });

    return w.status(200).send("Profile deleted successfully ...");
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//delete user using user id
userRouter.delete("/:id", async (c, w) => {
  const id = c.params.id;
  try {
    await User.deleteOne({ _id: id });
    return w.status(200).send("User deleted successfully ...");
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

export default userRouter;
