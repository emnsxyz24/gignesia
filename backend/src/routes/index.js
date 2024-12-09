import express from "express";
import authRouter from "./authRoutes.js";
import category from "./categoryRoutes.js";
import service from "./serviceRoutes.js";

const routes = express.Router();

// Menambahkan authRouter untuk rute otentikasi
routes.use(authRouter);
routes.use(category);
routes.use(service);

export default routes;
