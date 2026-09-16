import jwt from "jsonwebtoken";

// Generate JWT token
export const tokenGen = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
  return token;
};

// Decode JWT token
export const tokenDecode = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

// Verify JWT token
export const tokenVerify = (token) => {
  try {
    const payload = jwt.verify(token, process.env.CHECK_JWT);
    return payload;
  } catch (error) {
    return null;
  }
};
