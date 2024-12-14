import express from "express";
import {
    createJob,
    deleteJob,
    getJobs,
    getJobById,
    updateJob,
} from "../controllers/jobController.js";
import { auth } from "../middleware/authMiddleware.js";

const {router} = express();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Operations related to Jobs
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     service_id:
 *                       type: string
 *                     client_id:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:   
 *         description: Internal server error
 *  
 *
 * 
 */