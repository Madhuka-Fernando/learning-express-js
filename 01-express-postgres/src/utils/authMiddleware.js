import { tokenVerify } from "./jwt.js";

export const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  // Check if authorization header is present
  if (auth === undefined) {
    return res.status(401).json({
      msg: "Error",
      error: "Token Not Found",
      data: null,
    });
  }
  // Check if type is "Token"
  if (auth.split(" ")[0] !== "Token") {
    return res.status(400).json({
      msg: "Error",
      error: "Bad Request",
      data: null,
    });
  }
  // Get the token from the authorization header
  const token = auth.split(" ")[1];
  // Verify the token
  const payload = tokenVerify(token);
  // Check if payload is null
  if (payload === null) {
    return res.status(401).json({
      msg: "Error",
      error: "Token Expired",
      data: null,
    });
  }
  next();
};
