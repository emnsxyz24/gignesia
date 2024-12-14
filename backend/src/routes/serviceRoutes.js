import express from "express";
import {
  createService,
  deleteService,
  getServices,
  getServiceById,
  updateService,
  updateServiceStatus,
} from "../controllers/serviceController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Operations related to services
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category_id:
 *                     type: string
 *                   price:
 *                     type: number
 *                   freelancer_id:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/services", auth, getServices);


/**
 * @swagger
 * /api/service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category_id:
 *                   type: string
 *                 price:
 *                   type: number
 *                 freelancer_id:
 *                   type: string
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.get("/service/:id", auth, getServiceById);


/**
 * @swagger
 * /api/service:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               price:
 *                 type: number
 *               freelancer_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created service
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/service", auth, createService);

/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               price:
 *                 type: number
 *               freelancer_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated service
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put("/service/:id", auth, updateService);

/**
 * @swagger
 * /api/service/{id}/status:
 *   put:
 *     summary: Update the status of a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to update the status  
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated service status 
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put("/service/status/:id", auth, updateServiceStatus);

/**
 * @swagger
 * /api/service/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted service
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete("/service/:id", auth, deleteService);

export default router;
