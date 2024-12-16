import express from "express";
import authRouter from "./authRoutes.js";
import category from "./categoryRoutes.js";
import service from "./serviceRoutes.js";
import user from "./userRoutes.js";
import order from "./orderRoutes.js";
import notification from "./NotificationRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import midtrans from "./midtransRoutes.js"


const routes = express.Router();

// Menambahkan authRouter untuk rute otentikasi
routes.use(authRouter);
routes.use(category);
routes.use(service);
routes.use(user);
routes.use(order);
routes.use(notification);
routes.use(reviewRoutes);
routes.use(midtrans)

export default routes;
