import { body } from "express-validator";

// Validation middleware for incoming requests
export const validateRequest = () => [
  body("name")
    .isAlpha()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name must not be empty"),
  body("age").isInt().withMessage("Age must be a number"),
];
