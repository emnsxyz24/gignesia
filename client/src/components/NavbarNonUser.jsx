import { useState } from "react";
import logoWhite from "../assets/icons/logo-white.png";
import logo from "../assets/icons/logo.png";
import profile from "../assets/icons/profile.png";
import { Link } from "react-router-dom";

const NavbarNonUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div id="navbar" className="header-nav h-20 items-center px-6 top-0 mb-5">
      <nav className="relative">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logoWhite}
              //   src={logo}
              className="h-8"
              alt="Logo"
            />
            <span
              className="self-center text-2xl text-white font-semibold whitespace-nowrap"
              //   className="self-center text-2xl text-[#0B1215] font-semibold whitespace-nowrap"
            >
              GigNesia
            </span>
          </a>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`
              absolute 
              top-full 
              left-0 
              w-full 
              ${isMenuOpen ? "block" : "hidden"} 
              md:static 
              md:block 
              md:w-auto
            `}
          >
            <ul
              className="
              burger-navbar
              font-medium 
              flex 
              flex-col 
              p-4 
              md:flex-row 
              md:space-x-8 
              rtl:space-x-reverse
              md:border-0
              border
              border-[#6051c2]
              md:bg-transparent
              bg-[#141720]
              rounded-xl
            "
            >
              <li>
                <a className="block py-2 px-3 bg-transparent text-white hover:text-[#6051c2] md:p-2">
                  <Link to="/user">Home</Link>
                </a>
              </li>
              <li>
                <a
                  className="block py-2 px-3 text-white hover:text-[#6051c2] md:p-2"
                //   className="block py-2 px-3 text-[#0B1215] hover:text-[#6051c2] md:p-2"
                >
                  <Link to="/about">About</Link>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#6051c2] md:p-2"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white hover:text-[#6051c2] md:p-2 bg-[#6051c2] text-center m-auto rounded-3xl"
                  //   className="block py-2 px-3 text-[#0B1215] hover:text-[#6051c2] md:p-2"
                >
                  Sign up
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white md:p-2 bg-[#6051c2] text-center m-auto rounded-3xl"
                >
                  <img src={profile} className="h-8" alt="Logo"></img>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarNonUser;
