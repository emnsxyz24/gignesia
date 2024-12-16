import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useServices } from "../../context/ServiceContex";
import Navbar from "../../components/Navbar";
import { Loading } from "../../components/Loadings";
import Swal from "sweetalert2";
import { parseISO } from "date-fns";
import ServiceReviewModal from "../../components/ReviewForm";
import ClientReview from "../../components/ClientReview";
import Footer from "../../components/Footer";

const HistoryOrders = () => {
  const { user } = useAuth();
  const { fetchOrdersByClientId, getReviews } = useServices();
  const [orders, setOrders] = useState([]);
  const [isLoadings, setIsLoading] = useState(true);
  const [selectedServiceForReview, setSelectedServiceForReview] =
    useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [orderReviews, setOrderReviews] = useState({});

  useEffect(() => {
    const fetchOrdersAndReviews = async () => {
      if (user._id) {
        try {
          const response = await fetchOrdersByClientId(user._id);
          setOrders(response);

          const review = await getReviews(user._id);
          const reviewsByOrderId = review.data.reduce((acc, reviewItem) => {
            const orderIdKey = reviewItem.orderId?._id || reviewItem.orderId;
            acc[orderIdKey] = reviewItem;
            return acc;
          }, {});
          setOrderReviews(reviewsByOrderId);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrdersAndReviews();
  }, [user._id]);


  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "completed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  const handleLeaveReview = (order) => {
    if (order.status === "completed") {
      setSelectedServiceForReview({
        orderId: order._id,
        serviceId: order.service_id._id,
        serviceName: order.service_id.title,
      });
      setIsReviewModalOpen(true);
    }
  };

  const handleViewOrderDetails = (order) => {
    Swal.fire({
      title: "Detail Pesanan",
      html: `
        <div class="text-left space-y-2">
          <p><strong>Layanan:</strong> ${order.service_id.title}</p>
          <p><strong>Freelancer:</strong> ${order.freelancer_id.name}</p>
          <p><strong>Harga:</strong> Rp${order.amount.toLocaleString(
            "id-ID"
          )}</p>
          <p><strong>Status:</strong> <span class="${getStatusColor(
            order.status
          )}">${
        order.status === "completed"
          ? "Completed"
          : order.status === "cancelled"
          ? "Cancelled"
          : order.status === "pending"
          ? "Pending"
          : "Unknown"
      }</span></p>
          <p><strong>Tanggal Pesanan:</strong> ${parseISO(
            order.created_at
          ).toLocaleString("id-ID")}</p>
          ${orderReviews[order._id]  ? `<p><strong>Review:</strong> ${orderReviews[order._id].comment}</p>` : ''}
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
    });
  };

  if (isLoadings) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Riwayat Pesanan</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Anda belum memiliki riwayat pesanan
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">
                      {order.service_id.title}
                    </h2>
                    <span
                      className={`font-bold ${getStatusColor(order.status)}`}
                    >
                      {order.status === "completed"
                        ? "Completed"
                        : order.status === "cancelled"
                        ? "Cancelled"
                        : order.status === "pending"
                        ? "Pending"
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">{order.freelancer_id.name}</p>
                    <p className="font-bold text-[#6051c2]">
                      Rp{order.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => handleViewOrderDetails(order)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg inline hover:bg-green-700 transition duration-300"
                    >
                      Details
                    </button>
                    {order.status === "completed" ? (
                      orderReviews[order._id] ? (
                        <div className="flex items-center justify-center">
                          {<ClientReview rating={orderReviews[order._id].rating} />}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleLeaveReview(order)}
                          className="bg-[#6051c2] text-white px-4 py-2 rounded-lg inline hover:bg-purple-900"
                        >
                          Leave a Review
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              ))}
            <ServiceReviewModal
              isOpen={isReviewModalOpen}
              onClose={() => {
                setIsReviewModalOpen(false);
              }}
              orderId={selectedServiceForReview?.orderId}
              userId={user._id}
              serviceName={selectedServiceForReview?.serviceName}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HistoryOrders;
