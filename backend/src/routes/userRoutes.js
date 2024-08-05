import express from "express";
import { register, login, getIdUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getIdByEmail", getIdUserByEmail)

export default router;
