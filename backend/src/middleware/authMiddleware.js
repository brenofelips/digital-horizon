import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: result?.id };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: `Token is not valid -> ${error}` });
  }
};

export default authMiddleware;
