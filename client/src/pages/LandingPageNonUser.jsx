import heroImage from "../assets/heros/hero-image.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const LandingPageNonUser = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="mx-auto md:mx-0 bg-[#141720]">
          <div className="h-20 items-center px-6">
            <Navbar />
          </div>
          <div className="flex-grow ">
            <div className="flex justify-center items-center h-screen ">
              <div className="container mx-auto p-4 w-full">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 lg:w-2/3">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 ">
                      Selesaikan
                      <br />
                      kebutuhanmu disini
                      <br className="hidden md:block" />
                      <span> bersama</span>{" "}
                      <span className="text-[#6051c2]">Ahlinya</span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 ">
                      Hemat waktumu dan dapatkan hasil maksimal
                      <br /> dengan harga murah
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="/login"
                        className="bg-[#6051c2] hover:bg-[#5645c5] text-white font-bold py-3 px-6 rounded-3xl"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                    <img
                      src={heroImage}
                      alt="Hero Image"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingPageNonUser;
