import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import {
  LoginValidation,
  RegisterValidation,
} from "../middlewares/validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterValidation, register);
router.post("/login", LoginValidation, login);
router.get("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
