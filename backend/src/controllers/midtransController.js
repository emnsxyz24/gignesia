import crypto from "crypto";
import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
import dotenv from "dotenv";

dotenv.config();

export const midtransWebhookHandler = async (req, res) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const body = req.body;
  try {
    const { order_id, status_code, gross_amount, signature_key } = body;
    const signatureInput = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const generatedSignature = crypto
      .createHash("sha512")
      .update(signatureInput)
      .digest("hex");

    if (generatedSignature !== signature_key) {
      return res.status(400).json({ message: "Invalid signature" });
    } 
    console.log("ini body",body)

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const notification = {
      user_id: order.freelancer_id,
      order_id: order._id,
      message: "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    switch (body.transaction_status) {
      case "settlement":
        order.paymentStatus = "completed";
        notification.message = `Pembayaran untuk pesanan #${order_id} telah diproses dan diterima.`;
        await Notification.create(notification);
        break;
      case "pending":
        order.paymentStatus = "pending";
        notification.message = `Pesanan #${order_id} baru diterima`;
        break;
      case "deny":
      case "cancel":
      case "expire":
        order.paymentStatus = "cancelled";
        order.progressStatus = "cancelled";
        notification.message = `Pesanan #${order_id} telah ditolak`;
        break;
      default:
        order.paymentStatus = "unknown";
        notification.message = `Menunggu Pesanan...`;
    }
    console.log(order)
    await order.save();
    res.status(200).json({ paymentStatus: "ok" });
  } catch (error) {
    console.error("Midtrans Webhook Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
