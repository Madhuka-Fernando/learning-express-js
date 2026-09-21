import { Router } from "express";
import User from "../model/user.mjs";
import Profile from "../model/profile.mjs";

const seedRouter = Router();

const userData = [
  {
    name: "AAAAAA",
    userName: "aaaa",
    password: "1234",
    email: "sample@com",
  },
  {
    name: "BBBBBB",
    userName: "bbbb",
    password: "1234",
    email: "sample2@com",
  },
  {
    name: "CCCCCC",
    userName: "cccc",
    password: "1234",
    email: "sample4@com",
  },
  {
    name: "DDDDDD",
    userName: "dddd",
    password: "1234",
    email: "sample5@com",
  },
  {
    name: "EEEEEE",
    userName: "eeee",
    password: "1234",
    email: "sample6@com",
  },
];

const profileImg = [
  {
    img: "Image 1",
  },
  {
    img: "Image 2",
  },
  {
    img: "Image 3",
  },
  {
    img: "Image 4",
  },
  {
    img: "Image 5",
  },
];

seedRouter.post("/register-userAndprofile", async (c, w) => {
  userData.forEach(async (u, index) => {
    if (index === Number(c.query.index)) {
      const newUser = await User.create({
        name: u.name,
        userName: u.userName,
        password: u.password,
        email: u.email,
      });
      console.log(newUser);

      const newProfile = await Profile.create({
        img: profileImg[index].img,
        user: newUser._id,
      });
      newUser.profile = newProfile._id;
      await newUser.save();
      w.sendStatus(200);
    }
  });
});

export default seedRouter;
