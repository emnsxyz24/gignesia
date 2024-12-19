import { useState, useEffect } from "react";
import SideNavbar from "../../components/SideNavbar";
import { useServices } from "../../context/ServiceContex";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";

const Orders = () => {
  const { user } = useAuth();
  const { fetchOrdersByFreelancerId, updateOrderProgressStatus } =
    useServices();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByFreelancerId(user._id);
        setOrders(response);
        setFilteredOrders(response);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        searchTerm === "" ||
        order.client_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service_id.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, orders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputSearch);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown((prevId) => (prevId === id ? null : id));
  };

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

  const handleDetailButton = (order) => {
    Swal.fire({
      title: "Detail Pesanan",
      html: `
        <div class="text-left space-y-2">
          <p><strong>Order Id:</strong> #${order._id}</p>
          <p><strong>Nama Client:</strong> ${order.client_id.name}</p>
          <p><strong>Layanan:</strong> ${order.service_id.title}</p>
          <p><strong>Harga:</strong> Rp${order.amount.toLocaleString(
            "id-ID"
          )}</p>
          <p><strong>Status:</strong> <span class="${getStatusColor(
            order.paymentStatus
          )}">${
        order.paymentStatus === "completed"
          ? "Completed"
          : order.paymentStatus === "inProgress"
          ? "inProgress"
          : order.paymentStatus === "pending"
          ? "Pending"
          : order.paymentStatus === "cancelled"
          ? "Cancelled"
          : "Unknown"
      }</span></p>
          <p><strong>Tanggal Pesanan:</strong> ${order.created_at}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: false,
      confirmButtonText: "OK",
    });
  };

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      const { value: progressStatus } = await Swal.fire({
        title: "Update Order Status",
        input: "select",
        inputOptions: {
          pending: "Pending",
          inProgress: "In Progress",
          completed: "Completed",
        },
        inputPlaceholder: "Pilih status",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Pilih status order!";
          }
        },
      });
      if (progressStatus) {
        console.log(orderId, progressStatus);
        await updateOrderProgressStatus(orderId, { progressStatus });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Status order behasil diperbarui!.",
        }).then(() => {
          fetchOrdersByFreelancerId(user._id).then((response) => {
            setOrders(response);
          });
        });
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update order status.",
      }).then(() => {
        fetchOrdersByFreelancerId(user._id).then((response) => {
          setOrders(response);
        });
      });
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders
    .slice()
    .reverse()
    .slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <SideNavbar activeId={"2"} />
      <main className=" md:ml-64 pt-20 flex flex-col">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Daftar Pesanan</h1>
          <div className="mt-4 mb-4">
            <form className="w-1/4" onSubmit={handleSubmit}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-[#F2F2F2]"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#F2F2F2] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari Pesanan..."
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="lg:block hidden text-[#F2F2F2] absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="relative overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Klien
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jenis Jasa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pembayaran
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order, idx) => {
                    return (
                      <tr
                        key={idx}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          #{order._id}
                        </th>
                        <td className="px-6 py-4">{order.client_id.name}</td>
                        <td className="px-6 py-4">{order.service_id.title}</td>
                        <td className="px-6 py-4 text-nowrap">
                          {order.progressStatus === "inProgress" && (
                            <span className="bg-gray-200 p-2 rounded text-black">
                              In Progress
                            </span>
                          )}
                          {order.progressStatus === "pending" && (
                            <span className="bg-yellow-200 p-2 rounded text-black text-nowrap">
                              Pending
                            </span>
                          )}
                          {order.progressStatus === "completed" && (
                            <span className="bg-green-200 p-2 rounded text-green-900">
                              Completed
                            </span>
                          )}
                          {order.progressStatus === "cancelled" && (
                            <span className="bg-red-200 p-2 rounded text-red-900">
                              Cancelled
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {order.paymentStatus === "cancelled" && (
                            <span className="bg-red-200 p-2 rounded text-red-900">
                              Cancelled
                            </span>
                          )}
                          {order.paymentStatus === "pending" && (
                            <span className="bg-yellow-200 p-2 rounded text-black text-nowrap">
                              Pending
                            </span>
                          )}
                          {order.paymentStatus === "completed" && (
                            <span className="bg-green-200 p-2 rounded text-green-900">
                              Completed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">{order.formattedUpdateAt}</td>
                        <td className="px-6 py-4 relative">
                          <div className="relative inline-block">
                            <button
                              onClick={() => toggleDropdown(order._id)}
                              className="flex"
                            >
                              <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeWidth="3"
                                  d="M12 6h.01M12 12h.01M12 18h.01"
                                />
                              </svg>
                            </button>
                            {activeDropdown === order._id && (
                              <div className="absolute bottom-full right-full z-10  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                                <ul className="py-2 flex text-sm items-center justify-center w-full text-gray-700 dark:text-gray-200">
                                  <li className="border-r">
                                    <button
                                      onClick={() =>
                                        handleUpdateOrderStatus(order._id)
                                      }
                                      className={`${order.paymentStatus === "cancelled" ? "hidden" : "flex"} items-center  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-nowrap`}
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleDetailButton(order)}
                                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-nowrap"
                                    >
                                      Details
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
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
                    onClick={() => paginate(number)}
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
      </main>
    </>
  );
};
export default Orders;
