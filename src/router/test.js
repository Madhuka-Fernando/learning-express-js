import { Router } from "express";
import { matchedData, query } from "express-validator";
import { validationResult } from "express-validator";
import { validateRequest } from "../utils/validatorMethod.js";
const testRouter = Router();

//testing middleware
testRouter.get(
  "/",
  (req, res, next) => {
    console.log(1);
    next();
  },
  (req, res, next) => {
    console.log(2);
    next();
  },
  (req, res) => {
    console.log(3);
    res.sendStatus(200);
  },
);

//testing middleware with express-validator
testRouter.get(
  "/validate",
  query("name")
    .isAlpha()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name must not be empty"),
  query("age").isInt().withMessage("Age must be a number"),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.array().length) return res.sendStatus(400);
    res.sendStatus(200);
  },
);

// Middleware with external method
testRouter.get("/validate2", validateRequest(), (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req); // This will extract the validated data
  console.log(data); // Show validated data in console

  console.log(errors.array());
  if (errors.array().length) return res.sendStatus(400);
  res.sendStatus(200);
});

export default testRouter;
