import midtransHelper from "../helper/midtrans.js";
import Order from "../models/Order.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const createOrder = async (req, res) => {
  const { service_id, client_id, freelancer_id, amount, service_name } =
    req.body;

  try {
    const client = await User.findById(client_id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const order = await Order.create({
      service_id,
      client_id,
      freelancer_id,
      amount: service.price,
      status: "pending",
    });

    const parameter = {
      transaction_details: {
        order_id: order._id.toString(),
        gross_amount: service.price,
      },
      item_details: [
        {
          id: service_id,
          price: service.price,
          quantity: 1,
          name: service.title,
        },
      ],
      customer_details: {
        first_name: client.name,
        email: client.email,
      },
    };

    const notification = {
      user_id: freelancer_id,
      order_id: order._id.toString(),
      message: `Pesanan #${order._id.toString()} baru diterima`,
    }
    
    const snapResponse = await midtransHelper.snapPayment(parameter);

    order.payment_gateway_id = snapResponse.token;
    await order.save();

    await Notification.create(notification);

    res.status(200).json({
      message: "Order created successfully",
      order,
      payment_url: snapResponse.redirect_url,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export const getOrdersByClientId = async (req, res) => {
  try {
    const {client_id} = req.params;
    const orders = await Order.find({client_id}).populate("freelancer_id").populate("service_id"); 
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this client" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { service_status } = req.body; // Pastikan hanya service_status yang diubah

  try {
    const order = await Order.findByIdAndUpdate(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.service_status = service_status; // Update hanya status pengerjaan jasa
    await order.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};

export const getFreelancerEarnings = async (req, res) => {
  const { freelancer_id } = req.params;
  try {
    console.log(freelancer_id);
    const orders = await Order.find({
      freelancer_id: freelancer_id,
      status: "completed",
    }).sort({ updated_at: -1 });

    const totalEarnings = orders.reduce((total, order) => {
      return total + order.amount;
    }, 0);

    res.status(200).json({
      message: "Freelancer earnings fetched successfully",
      totalEarnings,
      earningsHistory: orders,
    });
  } catch (error) {
    console.error("Error fetching freelancer earnings:", error);
    res.status(500).json({
      message: "Failed to fetch freelancer earnings",
      error: error.message,
    });
  }
};

export const getOrderByFreelancerId = async (req, res) => {
  const { freelancer_id } = req.params;

  try {
    const orders = await Order.find({ freelancer_id }).populate("service_id").populate("client_id");
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this freelancer" });
    }
    res.status(200).json({
      message: "Orders fetched successfully",
      Orders: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};
