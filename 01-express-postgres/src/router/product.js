import e, { Router } from "express";
import {
  commonPathValidate,
  commonQueryValidate,
  commonValidate,
} from "../utils/validatorMethod.js";
import { matchedData, param, validationResult } from "express-validator";
import { resError } from "../utils/error-creater.js";
import prisma from "../db/db.js";

const productRouter = Router();

// get all product
productRouter.get("/all", async (_, res) => {
  try {
    const products = await prisma.product.findMany({
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
    });
    return res.status(200).json({
      msg: "Products retrieved successfully",
      error: null,
      data: products,
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

// get all product by user
productRouter.get(
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
      const products = await prisma.product.findMany({
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
          products.length > 0
            ? `${products[0]?.User?.UserName}'s Products retrieved successfully`
            : "No Products found",
        error: null,
        data: products,
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

// get product by id
productRouter.get("/:id", commonPathValidate("id"), async (req, res) => {
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

// update product by user id
productRouter.put(
  "/update/:Id",
  commonValidate("Name"),
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
      const product = await prisma.product.update({
        data: {
          Name: data.Name,
        },
        where: {
          Id: parseInt(data.Id),
        },
      });
      return res.status(200).json({
        msg: "Product updated successfully",
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
  },
);

// create new product
productRouter.post(
  "/create",
  commonValidate("UserId", "Name"),
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
      const product = await prisma.product.create({
        data: {
          UserId: parseInt(data.UserId),
          Name: data.Name,
        },
      });
      return res.status(201).json({
        msg: "Product created successfully",
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
  },
);

// delete product
productRouter.delete(
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
      const product = await prisma.product.delete({
        where: {
          Id: parseInt(data.Id),
        },
        select: {
          Name: true,
        },
      });
      return res.status(200).json({
        msg: "product deleted successfully",
        error: null,
        data: `${product.Name} has been deleted`,
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

export default productRouter;
