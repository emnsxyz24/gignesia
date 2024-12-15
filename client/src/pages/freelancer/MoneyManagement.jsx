import { useEffect, useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import { useAuth } from "../../context/AuthContext";
import { useServices } from "../../context/ServiceContex";
import { parseISO } from "date-fns";


const MoneyManagement = () => {
  const { user } = useAuth();
  const {fetchFreelancerEarnings} = useServices();
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user._id) {
        try {
          setIsLoading(true);
          const response = await fetchFreelancerEarnings(user._id);
          const totalEarnings = response.totalEarnings;
          setEarnings(totalEarnings.toLocaleString("id-ID"));
          setEarningsHistory(response.earningsHistory);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user._id]);

  return (
    <>
      <SideNavbar activeId={"4"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Money Management</h1>
        <div className="border-2 shadow rounded-lg bg-white border-gray-300 dark:border-gray-600 mb-4">
          <h1 className="text-3xl font-bold mb-4 p-4">Saldo Tersedia</h1>
          <h1 className="text-3xl font-bold mb-4 p-4 text-green-500">
            Rp {earnings}
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
              {earningsHistory.map((history,idx) => {
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
                  <td className="px-6 py-4">{parsedDate.toLocaleDateString("id-ID")}</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        
      </main>
    </>
  );
};

export default MoneyManagement;
