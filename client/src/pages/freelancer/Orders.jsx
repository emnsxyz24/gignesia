import { useState } from "react";
import SideNavbar from "../../components/SideNavbar";

const Orders = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const orders = [
    {
      id: 1,
      client: "John Doe",
      service: "Web Design",
      status: "Pending",
      date: "2023-06-01",
    },
    {
      id: 2,
      client: "Jane Smith",
      service: "Logo Design",
      status: "In Progress",
      date: "2023-05-28",
    },
    {
      id: 3,
      client: "Bob Johnson",
      service: "SEO Optimization",
      status: "Completed",
      date: "2023-05-25",
    },
  ];

  const toggleDropdown = (id) => {
    setActiveDropdown((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <SideNavbar activeId={"2"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Daftar Pesanan</h1>
        <div className="mt-4 mb-4">
          <form className="w-1/4">
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
                placeholder="Cari Freelancer..."
                required
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
        {/* {actionDropdown} */}
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
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </th>
                  <td className="px-6 py-4">{order.client}</td>
                  <td className="px-6 py-4">{order.service}</td>
                  <td className="px-6 py-4">
                    {order.status === "Pending" && (
                      <span className="bg-gray-200 p-2 rounded text-black">
                        {order.status}
                      </span>
                    )}
                    {order.status === "In Progress" && (
                      <span className="bg-yellow-200 p-2 rounded text-black text-nowrap">
                        {order.status}
                      </span>
                    )}
                    {order.status === "Completed" && (
                      <span className="bg-green-200 p-2 rounded text-green-900">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 relative">
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleDropdown(order.id)}
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
                      {activeDropdown === order.id && (
                        <div className="absolute bottom-full right-full z-10  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                          <ul className="py-2 flex text-sm items-center justify-center w-full text-gray-700 dark:text-gray-200">
                            <li className="border-r">
                              
                              <a
                                href="#"
                                className="flex items-center  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-nowrap"
                              >
                                Action 1
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-nowrap"
                              >
                                Action 2
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};
export default Orders;
