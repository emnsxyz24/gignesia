import SideNavbar from "../../components/SideNavbar";

const MoneyManagement = () => {
  const histories = [
    {
      id: 1,
      ord: "ORD001",
      total: 5000000,
      date: "2023-06-01",
    },
    {
      id: 2,
      ord: "ORD002",
      total: 2000000,
      date: "2023-05-28",
    },
    {
      id: 3,
      ord: "ORD003",
      total: 3000000,
      date: "2023-05-25",
    },
  ];
  return (
    <>
      <SideNavbar activeId={"4"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Money Management</h1>
        <div className="border-2 shadow rounded-lg bg-white border-gray-300 dark:border-gray-600 mb-4">
          <h1 className="text-3xl font-bold mb-4 p-4">Saldo Tersedia</h1>
          <h1 className="text-3xl font-bold mb-4 p-4 text-green-500">
            Rp 10,000,000
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
              {histories.map((history) => (
                <tr
                  key={history.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {history.ord}
                  </th>
                  <td className="px-6 py-4">
                    Rp {history.total.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">{history.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </main>
    </>
  );
};

export default MoneyManagement;
