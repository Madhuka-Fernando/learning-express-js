import e, { Router } from "express";
import {
  commonPathValidate,
  commonQueryValidate,
  commonValidate,
} from "../utils/validatorMethod.js";
import { matchedData, param, validationResult } from "express-validator";
import { resError } from "../utils/error-creater.js";
import prisma from "../db/db.js";

const categoryRouter = Router();

// get all category
categoryRouter.get("/all", async (_, res) => {
  try {
    const category = await prisma.category.findMany({
      // get only Name from category table
      select: {
        Name: true,
        // get UserName from User table
        User: {
          select: {
            UserName: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "category retrieved successfully",
      error: null,
      data: category,
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

// get all category by user
categoryRouter.get(
  "/all-by-user",
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
      const category = await prisma.category.findMany({
        // get only Name from product table
        select: {
          Name: true,
          // get UserName from User table
          User: {
            select: {
              UserName: true,
            },
          },
        },
        where: {
          UserId: parseInt(data.UserId),
        },
      });
      return res.status(200).json({
        msg:
          category.length > 0
            ? `${category[0]?.User?.UserName}'s category retrieved successfully`
            : "No category found",
        error: null,
        data: category,
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

// get category by id
categoryRouter.get("/:id", commonPathValidate("id"), async (req, res) => {
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
    const product = await prisma.product.findUnique({
      where: {
        Id: parseInt(data.id),
      },
      // get only Img from profile table
      select: {
        Name: true,
        User: {
          select: {
            UserName: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "Product retrieved successfully",
      error: null,
      data: product,
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

// update category by user id
categoryRouter.put(
  "/update/:Id",
  commonValidate("Name", "productIds"),
  commonPathValidate("Id"),
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
      const category = await prisma.category.update({
        data: {
          Name: data.Name,
          // connect products
          Products: {
            connect: `${data.productIds}`
              .split(",")
              .map((d) => ({ Id: parseInt(d) })),
          },
        },
        where: {
          Id: parseInt(data.Id),
        },
      });
      return res.status(200).json({
        msg: "Category updated successfully",
        error: null,
        data: category,
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

// create new category
categoryRouter.post(
  "/create",
  commonValidate("Name", "productIds"),
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
      const category = await prisma.category.create({
        data: {
          Name: data.Name,
          // connect products
          Products: {
            connect: `${data.productIds}`
              .split(",")
              .map((d) => ({ Id: parseInt(d) })),
          },
        },
      });
      return res.status(201).json({
        msg: "Category created successfully",
        error: null,
        data: category,
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

// delete category
categoryRouter.delete(
  "/delete/:Id",
  commonPathValidate("Id"),
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
      const category = await prisma.category.delete({
        where: {
          Id: parseInt(data.Id),
        },
        select: {
          Name: true,
        },
      });
      return res.status(200).json({
        msg: "category deleted successfully",
        error: null,
        data: `${category.Name} has been deleted`,
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

export default categoryRouter;
