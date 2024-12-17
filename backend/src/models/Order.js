import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  freelancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "inProgress", "completed", "cancelled","unknown"],
  },
  progressStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "inProgress", "completed"],
  },
  payment_gateway_id: { type: String },
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
