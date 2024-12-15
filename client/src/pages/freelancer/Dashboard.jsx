import SideNavbar from "../../components/SideNavbar";

const Dashboard = () => {
  return (
    <>
      <SideNavbar  activeId={"1"}/>
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-4 justify-center items-center mx-auto">
          <div className="p-5 flex flex-col border-2 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 h-32 w-full md:h-64">
            <div className="flex justify-between items-center md:text-3xl text-md md:pt-5">
              <h1>Pesanan Selesai</h1>{" "}
              <span>
                <svg
                  className="w-[32px] h-[32px] text-green-500 dark:text-white"
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="md:text-6xl text-xl font-bold text-green-500 md:pt-5">
                15
              </h1>
            </div>
          </div>
          <div className="p-5 flex flex-col border-2 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 h-32 w-full md:h-64">
            <div className="flex justify-between items-center md:text-3xl text-md md:pt-5">
              <h1>Pesanan Dalam Proses</h1>{" "}
              <span>
                <svg
                  className="w-[32px] h-[32px] text-blue-500 dark:text-white"
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
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="md:text-6xl text-xl font-bold text-blue-500 md:pt-5">
                5
              </h1>
            </div>
          </div>
          <div className="p-5 flex flex-col border-2 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 h-32 w-full md:h-64">
            <div className="flex justify-between items-center md:text-3xl text-md md:pt-5">
              <h1>Total Pendapatan</h1>{" "}
              <span>
                <svg
                  className="w-[32px] h-[32px] text-[#6b46c1] dark:text-white"
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
                    strokeWidth="2"
                    d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="md:text-6xl text-xl font-bold text-[#6b46c1] md:pt-5">
                Rp 5,000,000
              </h1>
            </div>
          </div>
        </div>
        <div className="border-2 shadow rounded-lg bg-white border-gray-300 dark:border-gray-600 mb-4">
          <div className="flex p-3 items-center"> 
            <h1 className="text-2xl font-semibold">Notifikasi</h1>{" "}
            <svg
              className="w-[30px] h-[30px] text-blue-500 dark:text-white"
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg>
          </div>
          <div className="flex justify-between items-center border p-3 m-3 rounded-md bg-gray-200">
            <h1>Pesanan Diterima</h1>
            <span>5 menit yang lalu</span>
          </div>
          <div className="flex justify-between items-center border p-3 m-3 rounded-md bg-gray-200">
            <h1>Pembayaran untuk pesanan #1234 telah diterima</h1>
            <span>1 jam yang lalu</span>
          </div><div className="flex justify-between items-center border p-3 m-3 rounded-md bg-gray-200">
            <h1>Pesanan Diterima</h1>
            <span>2 jam yang lalu</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;