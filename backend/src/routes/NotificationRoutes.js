import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/notifications/:user_id", auth, getNotifications);

export default router;