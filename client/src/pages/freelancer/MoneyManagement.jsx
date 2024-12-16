import { useEffect, useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import { useAuth } from "../../context/AuthContext";
import { useServices } from "../../context/ServiceContex";
import { parseISO } from "date-fns";

const MoneyManagement = () => {
  const { user } = useAuth();
  const { fetchFreelancerEarnings } = useServices();
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [earningsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user._id) {
        try {
          setLoading(true);
          const response = await fetchFreelancerEarnings(user._id);
          const totalEarnings = response.totalEarnings;
          setEarnings(totalEarnings.toLocaleString("id-ID"));
          setEarningsHistory(response.earningsHistory);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user._id]);

  const indexOfLastEarning = currentPage * earningsPerPage;
  const indexOfFirstEarning = indexOfLastEarning - earningsPerPage;
  const currentEarnings = earningsHistory
    .slice()
    .reverse()
    .slice(indexOfFirstEarning, indexOfLastEarning);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(earningsHistory.length / earningsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <>
      <SideNavbar activeId={"4"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Money Management</h1>
        <div className="border-2 shadow rounded-lg bg-white border-gray-300 dark:border-gray-600 mb-4">
          <h1 className="text-3xl font-bold mb-4 p-4">Saldo Tersedia</h1>
          <h1 className="text-3xl font-bold mb-4 p-4 text-green-500">
            {loading ? (
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
            ) : (
              `Rp ${earnings}`
            )}
          </h1>
          <button className="bg-blue-500 text-white rounded-xl p-3 shadow hover:bg-blue-600 m-4">
            Tarik Saldo
          </button>
        </div>
        <div className="relative overflow-x-auto rounded-lg shadow mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID Pesanan
                </th>
                <th scope="col" className="px-6 py-3">
                  JUMLAH
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4 animate-pulse"></div>
                  </td>
                </tr>
              ) : (
                currentEarnings.map((history, idx) => {
                  const parsedDate = parseISO(history.updated_at);
                  return (
                    <tr
                      key={idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        #{history._id}
                      </th>
                      <td className="px-6 py-4">
                        Rp {history.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        {parsedDate.toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation" className="mt-4 flex justify-center">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      </main>
    </>
  );
};

export default MoneyManagement;
