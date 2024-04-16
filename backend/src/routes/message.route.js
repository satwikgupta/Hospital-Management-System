import { Router } from "express";
import { isAdminAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

import {
  sendMessage,
  getAllMessages,
} from "../controllers/message.controller.js";

router.get("/all", isAdminAuthenticated, getAllMessages);
router.post("/send", sendMessage);

export default router;
