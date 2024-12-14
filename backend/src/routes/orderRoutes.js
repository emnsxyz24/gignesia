import express from "express";
import {
  createOrder,
  deleteOrder,
  getFreelancerEarnings,
  getOrderByFreelancerId,
  getOrdersByClientId,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: string
 *               client_id:
 *                 type: string
 *               freelancer_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     service_id:
 *                       type: string
 *                     client_id:
 *                       type: string
 *                     freelancer_id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     status:
 *                       type: string
 *       400:
 *         description: Failed to create order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Client or service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/orders", auth, createOrder);

/**
 * @swagger
 * /api/orders/{client_id}:
 *   get:
 *     summary: Get orders by client ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         description: The client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders for the client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No orders found for this client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/orders/:client_id", auth, getOrdersByClientId);

/**
 * @swagger
 * /api/orders/freelancer/{freelancer_id}:
 *   get:
 *     summary: Get orders by freelancer ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: freelancer_id
 *         required: true
 *         description: The freelancer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders for the freelancer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No orders found for this freelancer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/orders/freelancer/:freelancer_id", auth, getOrderByFreelancerId);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID
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
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/orders/:id", auth, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{freelancer_id}/earnings:
 *   get:
 *     summary: Get freelancer earnings based on completed orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: freelancer_id
 *         required: true
 *         description: The freelancer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Freelancer earnings fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEarnings:
 *                   type: number
 *                 earningsHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No completed orders found for freelancer
 */
router.get("/orders/:freelancer_id/earnings", auth, getFreelancerEarnings);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/orders/:id", auth, deleteOrder);

export default router;
