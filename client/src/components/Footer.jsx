import React from "react";
import {
  Facebook,
  Github,
  GitBranch,
  Send,
  Instagram,
  Dribbble,
} from "lucide-react";
import logo from "../assets/icons/logo.png";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-6 mt-12 w-full"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <img className="w-20" src={logo} alt="" />
          </div>

          <p className="text-center text-gray-600 mb-8 max-w-2xl">
            High level experience in web design and development knowledge,
            producing quality work.
          </p>

          <button className="mb-12 bg-[#6051c2] hover:bg-[#9B4ED8] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
            Contact Us
          </button>

          <div className="flex gap-6 mb-16">
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Facebook className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Github className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <GitBranch className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Send className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Instagram className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Dribbble className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-white relative z-10">
          © 2024 GigNesia All Rights Reserved
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          className="w-full"
          height="120"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="#B666F2"
            fillOpacity="0.4"
          />
          <path
            d="M0 40L60 43.3C120 47 240 53 360 56.7C480 60 600 60 720 56.7C840 53 960 47 1080 50C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z"
            fill="#9B4ED8"
            fillOpacity="0.6"
          />
          <path
            d="M0 80L60 77.3C120 75 240 70 360 68.3C480 67 600 70 720 75C840 80 960 87 1080 88.3C1200 90 1320 87 1380 85L1440 83V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z"
            fill="#8E54E9"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
