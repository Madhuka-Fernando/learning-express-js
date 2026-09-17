import { Router } from "express";
import { matchedData, query } from "express-validator";
import { validationResult } from "express-validator";
import { validateRequest } from "../utils/validatorMethod.js";
import { signedCookies } from "cookie-parser";
const testRouter = Router();

//testing middleware
// testRouter.get(
//   "/",
//   (req, res, next) => {
//     console.log(1);
//     next();
//   },
//   (req, res, next) => {
//     console.log(2);
//     next();
//   },
//   (req, res) => {
//     console.log(3);
//     res.sendStatus(200);
//   },
// );

//testing middleware with express-validator
// testRouter.get(
//   "/validate",
//   query("name")
//     .isAlpha()
//     .withMessage("Name must be a string")
//     .notEmpty()
//     .withMessage("Name must not be empty"),
//   query("age").isInt().withMessage("Age must be a number"),
//   (req, res) => {
//     const errors = validationResult(req);
//     console.log(errors.array());
//     if (errors.array().length) return res.sendStatus(400);
//     res.sendStatus(200);
//   },
// );

// Middleware with external method
// testRouter.get("/validate2", validateRequest(), (req, res) => {
//   const errors = validationResult(req);
//   const data = matchedData(req); // This will extract the validated data
//   console.log(data); // Show validated data in console

//   console.log(errors.array());
//   if (errors.array().length) return res.sendStatus(400);
//   res.sendStatus(200);
// });

// Cookies Testing
testRouter.get("/get-cookies", (req, res) => {
  res.cookie("testCookie", "testValue", {
    maxAge: 1000 * 30,
    httpOnly: true,
    signed: true,
  });
  res.cookie("testCookie2", "testValue 2", {
    maxAge: 1000 * 60,
    httpOnly: true,
  });
  res.sendStatus(200);
});

// Read Cookies
testRouter.get("/read-cookies", (req, res) => {
  console.log(req.cookies); // it works only after download cookie-parser
  // console.log(req.headers.cookie);
  console.log(req.signedCookies); // To get signed cookies

  res.sendStatus(200);
});

// Session Testing
testRouter.get("/get-session", (req, res) => {
  req.session["testSession"] = {
    name: "session Name",
    age: "22",
  };

  req.session["testSession2"] = {
    name: "session Name 2",
    age: "23",
  };
  res.sendStatus(200);
});

// Read Session
testRouter.get("/read-session", (req, res) => {
  console.log(req.sessionID);

  console.log(req.session);

  res.sendStatus(200);
});

export default testRouter;
