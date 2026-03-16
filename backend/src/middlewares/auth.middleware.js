import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
    if (!token) {   
    return res.status(401).json({ message: "No token provided" });
    }
    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
        return res.status(401).json({ message: "Token is Invalid" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }   
};

export default authMiddleware;