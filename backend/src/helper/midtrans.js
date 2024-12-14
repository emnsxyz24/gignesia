import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

const midtransHelper = {};

midtransHelper.snapPayment = async (parameter) => {
  let snap = new midtransClient.Snap({
    isProduction: false, // Gunakan true jika sudah di production
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  parameter.transaction_details.gross_amount = parameter.item_details.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    const response = await snap.createTransaction(parameter);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Snap Payment Error:", error);
    throw error;
  }
};

export default midtransHelper;
