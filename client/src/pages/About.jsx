import Navbar from "../components/Navbar";
import heroImage from "../assets/heros/hero-about.png";
import temp_prof from "../assets/temp_prof.jpeg";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const About = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col ">
      <div
        className={`mx-auto ${
          !isAuthenticated ? "bg-[#141720] text-[#F2F2F2]" : ""
        }`}
      >
        <Navbar />
        <div className=" p-4 flex justify-center mx-auto flex-col items-center mt-5">
          <div className="relative h-[50vh] max-w-screen-xl w-full rounded-3xl overflow-hidden mb-4">
            <img
              src={heroImage}
              alt="About GigNesia"
              className="object-cover w-full h-full rounded"
            />
            <div className="absolute inset-0 rounded flex items-center justify-center">
              <h1
                className={`text-5xl font-bold ${
                  isAuthenticated ? "text-[#F2F2F2]" : "text-[#F2F2F2]"
                }`}
              >
                About GigNesia
                <hr
                  className={`mt-2 ${
                    !isAuthenticated ? "border-[#F2F2F2]" : ""
                  }`}
                />
              </h1>
            </div>
          </div>
          <h1
            className={`mt-6 text-4xl font-bold ${
              !isAuthenticated ? "text-[#F2F2F2]" : ""
            }`}
          >
            Our Value
          </h1>
          <div className="mt-4 mb-3 flex flex-wrap justify-center gap-2">
            {[
              {
                icon: (
                  <svg
                    className={`mx-auto w-[48px] h-[48px] ${
                      !isAuthenticated ? "text-[#F2F2F2]" : "text-gray-800"
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
                      d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
                    />
                  </svg>
                ),
                title: "Innovation",
                description:
                  "Mendorong ide-ide kreatif untuk solusi yang lebih baik dan relevan.",
              },
              {
                icon: (
                  <svg
                    className={`mx-auto w-[48px] h-[48px] ${
                      !isAuthenticated ? "text-[#F2F2F2]" : "text-gray-800"
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
                      d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z"
                    />
                  </svg>
                ),
                title: "Harga Transparan",
                description:
                  "Berkomitmen pada standar tertinggi untuk hasil yang memuaskan.",
              },
              {
                icon: (
                  <svg
                    className={`mx-auto w-[48px] h-[48px] ${
                      !isAuthenticated ? "text-[#F2F2F2]" : "text-gray-800"
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
                      strokeWidth="2"
                      d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                ),
                title: "Hasil Cepat",
                description:
                  "Berkomitmen pada standar tertinggi untuk hasil yang memuaskan.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`flex text-center justify-center items-center w-[30rem] rounded-lg shadow ${
                  !isAuthenticated
                    ? "bg-[#1E2533] border-[#2C3347]"
                    : "bg-[#F2F2F2] border border-gray-200"
                }`}
              >
                <div className="flex flex-col p-5">
                  {value.icon}
                  <div className="p-5">
                    <h5
                      className={`mb-2 text-xl font-bold tracking-tight ${
                        !isAuthenticated ? "text-[#F2F2F2]" : "text-gray-900"
                      }`}
                    >
                      {value.title}
                    </h5>
                    <p
                      className={`mb-3 font-normal ${
                        !isAuthenticated ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h1
            className={`text-4xl font-bold mt-12 ${
              !isAuthenticated ? "text-[#F2F2F2]" : ""
            }`}
          >
            Our Team
          </h1>
          <div className="mt-4 mb-12 flex flex-wrap justify-center gap-3">
            {[
              { name: "Rio Agustian", role: "Backend / UI - UX", img: "https://ik.imagekit.io/eqkqbj4b1/WhatsApp%20Image%202024-12-18%20at%2022.27.44_497e3019.jpg?updatedAt=1734537435831" },
              {
                name: "Edy Mikhael Novrianta Surbakti",
                role: "Frontend / Backend",img : "https://ik.imagekit.io/eqkqbj4b1/WhatsApp%20Image%202024-12-18%20at%2012.51.18_0259fcae.jpg?updatedAt=1734537459079"
              },
              { name: "Anantha", role: "Frontend / UI - UX", img: "https://ik.imagekit.io/eqkqbj4b1/WhatsApp%20Image%202024-12-18%20at%2022.27.44_42496e8c.jpg?updatedAt=1734537435898" },
              { name: "Intan", role: "Frontend / UI - UX", img: "https://ik.imagekit.io/eqkqbj4b1/image%20(8).png?updatedAt=1734538730786" },
              { name: "Alustina", role: "Frontend / UI - UX", img: "https://ik.imagekit.io/eqkqbj4b1/image%20(6).png?updatedAt=1734538606677" },
            ].map((member, index) => (
              <div
                key={index}
                className={`flex text-center justify-center items-center w-[30rem] rounded-lg shadow ${
                  !isAuthenticated
                    ? "bg-[#1E2533] border-[#2C3347]"
                    : "bg-[#F2F2F2] border border-gray-200"
                }`}
              >
                <div className="flex flex-col p-5">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={member.img}
                    alt="Avatar"
                  />
                  <div className="p-5">
                    <h5
                      className={`mb-2 text-xl font-bold tracking-tight ${
                        !isAuthenticated ? "text-[#F2F2F2]" : "text-gray-900"
                      }`}
                    >
                      {member.name}
                    </h5>
                    <p
                      className={`mb-3 font-normal ${
                        !isAuthenticated ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
