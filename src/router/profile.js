import e, { Router } from "express";
import {
  commonQueryValidate,
  commonValidate,
} from "../utils/validatorMethod.js";
import { matchedData, param, validationResult } from "express-validator";
import { resError } from "../utils/error-creater.js";
import prisma from "../db/db.js";

const profileRouter = Router();

// get all profile
profileRouter.get("/all", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      // get only Img from profile table
      select: {
        Img: true,
        // get only Name and UserName from AccountDetails table
        AccountDetails: {
          select: {
            Name: true,
            UserName: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "Profiles retrieved successfully",
      error: null,
      data: profiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error",
      error: "DataBase Error",
      data: null,
    });
  }
});

// get profile by id
profileRouter.get(
  "/:id",
  param("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Profile id cannot be empty and must be a number"),
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
      const profile = await prisma.profile.findUnique({
        where: {
          Id: parseInt(data.id),
        },
        // get only Img from profile table
        select: {
          Img: true,
          // get only Name and UserName from AccountDetails table
          AccountDetails: {
            select: {
              Name: true,
              UserName: true,
            },
          },
        },
      });
      return res.status(200).json({
        msg: "Profile retrieved successfully",
        error: null,
        data: profile,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error",
        error: "DataBase Error",
        data: null,
      });
    }
  },
);

// update profile by user id
profileRouter.put(
  "/update",
  commonValidate("Img"),
  commonQueryValidate("UserId"),
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
      const profile = await prisma.profile.update({
        data: {
          Img: data.Img,
        },
        where: {
          UserId: parseInt(data.UserId),
        },
      });
      return res.status(200).json({
        msg: "Profile updated successfully",
        error: null,
        data: profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "Error",
        error: "DataBase Error",
        data: null,
      });
    }
  },
);

// create new profile
profileRouter.post(
  "/create",
  commonValidate("Img"),
  commonQueryValidate("UserId"),
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
      const profile = await prisma.profile.create({
        data: {
          UserId: parseInt(data.UserId),
          Img: data.Img,
        },
      });
      return res.status(201).json({
        msg: "Profile created successfully",
        error: null,
        data: profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "Error",
        error: "DataBase Error",
        data: null,
      });
    }
  },
);

// delete profile
profileRouter.delete("/delete", commonQueryValidate("Id"), async (req, res) => {
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
    const profile = await prisma.profile.delete({
      where: {
        Id: parseInt(data.Id),
      },
      select: {
        AccountDetails: {
          select: {
            Name: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "Profile deleted successfully",
      error: null,
      data: `${profile.AccountDetails.Name}'s profile has been deleted`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error",
      error: "DataBase Error",
      data: null,
    });
  }
});

export default profileRouter;
