import express from 'express';
import { midtransWebhookHandler} from '../controllers/midtransController.js';

const router = express.Router();


router.post('/webhook', midtransWebhookHandler);


export default router;