import express from "express";
import authRouter from "./authRoutes.js"; // Pastikan menambahkan ekstensi .js

const routes = express.Router();

// Menambahkan authRouter untuk rute otentikasi
routes.use(authRouter);

export default routes;
