import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { useAuth } from "../context/AuthContext";

const SideNavbar = (props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const { activeId } = props;
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (activeId) setActive(activeId);
  }, [activeId]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-4">
            <li className="">
              <img className="mx-auto" src={logo} width={50}></img>
            </li>
            <li id="1" className={active === "1" ? "active" : ""}>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-[26px] h-[26px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                  <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                </svg>

                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li id="2" className={active === "2" ? "active" : ""}>
              <Link
                to="/orders"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-[26px] h-[26px] text-gray-800 dark:text-white"
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
                    d="M5 7h14M5 12h14M5 17h14"
                  />
                </svg>

                <span className="ml-3">Daftar Pesanan</span>
              </Link>
            </li>
            <li id="3" className={active === "3" ? "active" : ""}>
              <Link
                to="/services"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-[26px] h-[26px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ml-3">Kelola Jasa</span>
              </Link>
            </li>
            <li id="4" className={active === "4" ? "active" : ""}>
              <Link
                to="/management"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-[26px] h-[26px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                    clipRule="evenodd"
                  />
                  <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                </svg>

                <span className="ml-3">Keuangan</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
          <button
            className="border w-full rounded-md hover:bg-[#dfdddd]"
            id="user-menu-button"
            onClick={toggleProfileDropdown}
            aria-expanded="false"
            data-dropdown-toggle="dropdownProfile"
            data-dropdown-placement="top"
          >
            <div className="flex flex-row justify-center items-center p-4 gap-3">
              <img
                className="rounded-full object-cover w-10 h-10"
                width={30}
                src={user.profile_picture}
                alt="Avatar"
              />
              <div className="text-start w-0 flex-1">
                <div className="truncate font-semibold">{user.name}</div>
                <div className="truncate text-gray-500">{user.email}</div>
              </div>
              <svg
                className="w-[12px] h-[12px] text-gray-800 dark:text-white"
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
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </div>
          </button>

          <div
            id="dropdownProfile"
            className={`z-10 absolute bottom-full w-3/4 mb-2  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${
              profileDropdownVisible ? "block" : "hidden"
            }`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="multiLevelDropdownButton"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-[26px] h-[26px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Edit Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-[26px] h-[26px] text-gray-800 dark:text-white"
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
                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                    />
                  </svg>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
