import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "./Loadings";

const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <nav className="relative">
        <div className="max-w-screen-2xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className={`text-2xl font-bold ${
                  isAuthenticated ? "text-gray-800" : "text-white"
                }`}
              >
                GigNesia
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 ${
                    isAuthenticated ? "text-gray-800" : "text-white"
                  }`}
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
                    d="M18 6H6m12 4H6m12 4H6m12 4H6"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className={`${
                  isAuthenticated ? "text-gray-800" : "text-white"
                } hover:text-blue-600`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${
                  isAuthenticated ? "text-gray-800" : "text-white"
                } hover:text-blue-600`}
              >
                About
              </Link>
              <Link
                to={isAuthenticated ? "/freelancers" : "/login"}
                className={`${
                  isAuthenticated ? "text-gray-800" : "text-white"
                } hover:text-blue-600`}
              >
                {isAuthenticated ? "Cari Freelancers" : "Login"}
              </Link>
              <Link
                to={isAuthenticated ? "/history" : "/login"}
                className={`${
                  isAuthenticated ? "text-gray-800" : "text-white"
                } hover:text-blue-600`}
              >
                {isAuthenticated ? "History" : ""}
              </Link>


              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className={`focus:outline-none ${
                    isAuthenticated ? "" : "hidden"
                  }`}
                >
                  <img
                    src={user?.profile_picture.startsWith("/uploads") ? `https://gignesia-production.up.railway.app${user?.profile_picture}` : user?.profile_picture}
                    alt="Profile"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                        }}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isAuthenticated && isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md rounded-lg">
                <Link
                  to="/"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
          {isAuthenticated && isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md rounded-lg">
                <Link
                  to="/"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  About
                </Link>
                <Link
                  to="/freelancers"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Cari Freelancer
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full text-left text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
