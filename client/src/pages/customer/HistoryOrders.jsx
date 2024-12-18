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
  const [isLoadings, setIsLoading] = useState(false);
  const [selectedServiceForReview, setSelectedServiceForReview] =
    useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [orderReviews, setOrderReviews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(12);

  useEffect(() => {
    const fetchOrdersAndReviews = async () => {
      try {
        setIsLoading(true);
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
    };

    fetchOrdersAndReviews();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "completed":
        return "text-green-600";
      case "inProgress":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };
  const handleLeaveReview = (order) => {
    if (order.progressStatus === "completed") {
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
          <p><strong>Order Id:</strong> #${order._id}</p>

          <p><strong>Layanan:</strong> ${order.service_id.title}</p>
          <p><strong>Freelancer:</strong> ${order.freelancer_id.name}</p>
          <p><strong>Harga:</strong> Rp${order.amount.toLocaleString(
            "id-ID"
          )}</p>
          <p><strong>Status:</strong> <span class="${getStatusColor(
            order.progressStatus
          )}">${
        order.progressStatus === "completed"
          ? "Completed"
          : order.progressStatus === "inProgress"
          ? "inProgress"
          : order.progressStatus === "pending"
          ? "Pending"
          : "Unknown"
      }</span></p>
          <p><strong>Tanggal Pesanan:</strong> ${parseISO(
            order.created_at
          ).toLocaleString("id-ID")}</p>
          ${
            orderReviews[order._id]
              ? `<p><strong>Review:</strong> ${
                  orderReviews[order._id].comment
                }</p>`
              : ""
          }
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
    });
  };

  if (isLoadings) return <Loading />;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders
    .slice()
    .reverse()
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="mx-auto md:mx-0">
        <Navbar />
        <div className="flex-grow ">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Riwayat Pesanan
            </h1>

            {orders.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                Anda belum memiliki riwayat pesanan
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold">
                        {order.service_id.title}
                      </h2>

                      <span
                        className={`font-bold ${getStatusColor(
                          order.progressStatus
                        )}`}
                      >
                        {order.progressStatus === "completed"
                          ? "Completed"
                          : order.progressStatus === "inProgress"
                          ? "In progress"
                          : order.progressStatus === "pending"
                          ? "Pending"
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-600">
                        {order.freelancer_id.name}
                      </p>
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
                      {order.progressStatus === "completed" ? (
                        orderReviews[order._id] ? (
                          <div className="flex items-center justify-center">
                            {
                              <ClientReview
                                rating={orderReviews[order._id].rating}
                              />
                            }
                          </div>
                        ) : (
                          <button
                            onClick={() => handleLeaveReview(order)}
                            className="bg-[#6051c2] text-white px-4 py-2 rounded-lg inline hover:bg-purple-900"
                          >
                            Leave a Review
                          </button>
                        )
                      ) : order.paymentStatus === "pending" ? (
                        <a
                          href={`https://app.sandbox.midtrans.com/snap/v4/redirection/${order.payment_gateway_id}`}
                          target="_blank"
                          className="bg-[#6051c2] text-white px-4 py-2 rounded-lg inline hover:bg-purple-900"
                        >
                          Pembayaran
                        </a>
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
          <nav
            aria-label="Page navigation"
            className="mt-4 flex justify-center"
          >
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>

              {getPageNumbers().map((number) => (
                <li key={number}>
                  <button
                    onClick={() => setCurrentPage(number)}
                    aria-current={currentPage === number ? "page" : undefined}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === number
                        ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {number}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HistoryOrders;
