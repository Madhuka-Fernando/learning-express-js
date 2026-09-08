import { body, query } from "express-validator";

// Validation middleware for incoming requests
export const validateRequest = () => [
  body("name")
    .isAlpha()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name must not be empty"),
  body("age").isInt().withMessage("Age must be a number"),
];

//Create Registration validate middleware
export const registerValidate = [
  body("UserName").notEmpty().withMessage("UserName must not be empty"),
  body("Name").notEmpty().withMessage("Name must not be empty"),
  body("Password")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 2,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage(
      "Password must be strong and contain at least 8 characters, 2 numbers, 1 symbol, and 1 uppercase letter.",
    ),
];

//Create Common Validate
export const commonValidate = (...keys) => {
  const validations = [];
  keys.forEach((k) => {
    validations.push(body(k).notEmpty().withMessage(`${k} must not be empty`));
  });
  return validations;
};

//Create Common Query Validate
export const commonQueryValidate = (...keys) => {
  const validations = [];
  keys.forEach((k) => {
    validations.push(query(k).notEmpty().withMessage(`${k} must not be empty`));
  });
  return validations;
};
