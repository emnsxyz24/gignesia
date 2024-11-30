import Navbar from "../components/Navbar";
import heroImage from "../assets/heros/hero-about.png";

const About = () => {
  return (
    <div className="flex flex-col">
      <Navbar sticky={true} />
      <div className="flex justify-center flex-col items-center mt-5">
        <div className="relative h-[50vh] max-w-screen-xl w-full rounded-3xl overflow-hidden mb-4">
          <img
            src={heroImage}
            alt="About GigNesia"
            className="object-cover w-full h-full rounded"
          />
          <div className="absolute inset-0 rounded flex items-center justify-center">
            <h1 className="text-5xl  font-bold text-white">
              About GigNesia
              <hr className="mt-2" />
            </h1>
          </div>
        </div>
        <h1 className="mt-4 mb-3 text-4xl font-bold">Our Value</h1>
        <div className="mt-4 mb-3 flex flex-wrap justify-center gap-2">
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <svg
                class="mx-auto w-[48px] h-[48px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
                />
              </svg>

              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Innovation
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Mendorong ide-ide kreatif untuk solusi yang lebih baik dan
                  relevan.
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <svg
                class="mx-auto w-[48px] h-[48px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z"
                />
              </svg>

              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Harga Transparan
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Berkomitmen pada standar tertinggi untuk hasil yang memuaskan.
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <svg
                class="mx-auto w-[48px] h-[48px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>

              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Hasil Cepat
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Berkomitmen pada standar tertinggi untuk hasil yang memuaskan.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-4">Our Team</h1>
        <div className="mt-4 mb-3  flex flex-wrap justify-center gap-3">
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <img
                class="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://cdn.discordapp.com/attachments/1089590660966928515/1312305405451571272/agus.webp?ex=674c0326&is=674ab1a6&hm=dd553ad2928231951b7c51b08b99aa1c9dff0cf3dab89036032202f2f6b09148&"
                alt="Bonnie Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Rio Agustian
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Backend / UI - UX
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <img
                class="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://cdn.discordapp.com/attachments/1089590660966928515/1312305405451571272/agus.webp?ex=674c0326&is=674ab1a6&hm=dd553ad2928231951b7c51b08b99aa1c9dff0cf3dab89036032202f2f6b09148&"
                alt="Bonnie Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Edy Mikhael Novrianta Surbakti
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Frontend / Backend
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <img
                class="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://cdn.discordapp.com/attachments/1089590660966928515/1312305405451571272/agus.webp?ex=674c0326&is=674ab1a6&hm=dd553ad2928231951b7c51b08b99aa1c9dff0cf3dab89036032202f2f6b09148&"
                alt="Bonnie Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Anantha
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Frontend / UI - UX
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <img
                class="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://cdn.discordapp.com/attachments/1089590660966928515/1312305405451571272/agus.webp?ex=674c0326&is=674ab1a6&hm=dd553ad2928231951b7c51b08b99aa1c9dff0cf3dab89036032202f2f6b09148&"
                alt="Bonnie Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Intan
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Frontend / UI - UX
                </p>
              </div>
            </div>
          </div>
          <div className="flex text-center justify-center items-center w-[30rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col p-5">
              <img
                class="mx-auto mb-4 w-36 h-36 rounded-full"
                src="https://cdn.discordapp.com/attachments/1089590660966928515/1312305405451571272/agus.webp?ex=674c0326&is=674ab1a6&hm=dd553ad2928231951b7c51b08b99aa1c9dff0cf3dab89036032202f2f6b09148&"
                alt="Bonnie Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Alustina
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Frontend / UI - UX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
