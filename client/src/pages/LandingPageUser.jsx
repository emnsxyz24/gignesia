import { React, useEffect, useState } from "react";
import heroImage from "../assets/heros/hero-image.png";
import Navbar from "../components/Navbar";
import imgSec1 from "../assets/heros/img-section-1.png";
import LandingPagecard from "../components/LandingPageCard";
import LandingPageSecCard from "../components/LandingPageSecCard";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user.role === "freelancer") {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className=" flex justify-center items-center h-screen">
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 lg:w-2/3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#0B1215] font-bold mb-6 max-w-[46rem]">
                  Selesaikan kebutuhanmu disini bersama
                  <span className="text-[#6051c2]"> Ahlinya</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-[#37393a] mb-8">
                  Hemat waktumu dan dapatkan hasil maksimal
                  <br /> dengan harga murah
                </p>
                <div className="flex gap-2">
                  <a
                    href="/carifreelancer"
                    className="bg-[#6051c2] hover:bg-[#5645c5] text-white font-bold py-3 px-6 rounded-3xl"
                  >
                    Cari Freelancer
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 ">
                <img src={heroImage} alt="Hero Image" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex justify-center items-center h-[100vh]">
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 lg:w-2/3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-[#0B1215] font-bold mb-6 max-w-[42rem]">
                  Freelancer Profesional dalam satu tempat
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-[#37393a] mb-8">
                  Hemat waktumu dan dapatkan hasil maksimal
                  <br /> dengan harga murah
                </p>
              </div>
              <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                <img src={imgSec1} alt="Hero Image" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div id="sec3" className="flex justify-center items-center h-[100vh]">
          <div className="container mx-auto p-4 space-y-5">
            <div>
              <h1 className="text-4xl text-[#0B1215] font-bold mb-6 ">
                Kategori jasa yang banyak dicari
              </h1>
            </div>
            <LandingPagecard />
            <div>
              <h1 className="text-4xl text-[#0B1215] font-bold mb-6 ">
                Kenapa Menggunakan GigNesia Untuk Kebutuhan Freelance Anda?
              </h1>
            </div>
            <LandingPageSecCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
