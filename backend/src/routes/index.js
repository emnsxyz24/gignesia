import express from "express";
import authRouter from "./authRoutes.js";
import category from "./categoryRoutes.js";
import service from "./serviceRoutes.js";
import user from "./userRoutes.js";

const routes = express.Router();

// Menambahkan authRouter untuk rute otentikasi
routes.use(authRouter);
routes.use(category);
routes.use(service);
routes.use(user);

export default routes;
