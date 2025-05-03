import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied." });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

export default authMiddleware;
