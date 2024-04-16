import { Router } from "express";
import { isAdminAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

import {
  sendMessage,
  getAllMessages,
} from "../controllers/message.controller.js";

router
  .route("/")
  .get(isAdminAuthenticated, getAllMessages)
  .post(sendMessage);

export default router;
