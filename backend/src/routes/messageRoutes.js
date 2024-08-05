import express from "express";
import { createMessage, updateMessage, deleteMessage, getAllMessages, getMessageById } from "../controllers/messageControlle.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", authMiddleware, createMessage);
router.put("/:id", authMiddleware, updateMessage);
router.delete("/:id", authMiddleware, deleteMessage);
router.get("/", authMiddleware, getAllMessages);
router.get("/:id", authMiddleware, getMessageById);


export default router;
