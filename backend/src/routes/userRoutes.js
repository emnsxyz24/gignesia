import express from "express";
import {
  getUsers,
  updateProfile,
  updateProfilPic,
  getCurrentUser
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   profile_picture:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   whatsapp_number:
 *                     type: string
 *                   portfolio:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get("/users", auth, getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               bio:
 *                 type: string
 *               whatsapp_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     whatsapp_number:
 *                       type: string
 *                     profile_picture:
 *                       type: string
 *                     portfolio_urls:
 *                       type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put("/user/:id", auth, updateProfile);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the current user's profile
 *         
 *       500:
 *         description: Internal server error   
 * 
 * 
 */
router.get("/user", auth,getCurrentUser);

/**
 * @swagger
 * /api/user/{id}/profile-picture:
 *   put:
 *     summary: Update a user's profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update the profile picture
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put(
  "/user/:id/profile-picture",
  upload.single("profilePic"),
  auth,
  updateProfilPic
);

export default router;
