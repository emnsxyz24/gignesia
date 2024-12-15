import express from "express";
import authRouter from "./authRoutes.js";
import category from "./categoryRoutes.js";
import service from "./serviceRoutes.js";
import user from "./userRoutes.js";
import order from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";

const routes = express.Router();

// Menambahkan authRouter untuk rute otentikasi
routes.use(authRouter);
routes.use(category);
routes.use(service);
routes.use(user);
routes.use(order);
routes.use(reviewRoutes);

export default routes;
