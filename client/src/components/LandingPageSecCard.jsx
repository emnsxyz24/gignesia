import pricing from "../assets/icons/pricing.png";
import categories from "../assets/icons/categories.png";
import fastTime from "../assets/icons/fast-time.png";

const LandingPageSecCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <img
            className="rounded-t-lg mx-auto p-5"
            src={categories}
            alt=""
            width={180}
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Banyak Kategori
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Temukan freelancer berpengalaman untuk segala jenis tugas, dengan
              berbagai anggaran.
            </p>
          </div>
        </div>
      </div>
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div href="#">
          <img
            className="rounded-t-lg mx-auto p-5"
            src={pricing}
            alt=""
            width={180}
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Harga Transparan
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Bayar per proyek, dengan pembayaran yang hanya dilepaskan setelah
              Anda setujui.
            </p>
          </div>
        </div>
      </div>
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div href="#">
          <img
            className="rounded-t-lg mx-auto p-5"
            src={fastTime}
            alt=""
            width={180}
          />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Hasil Cepat
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Gunakan filter untuk menemukan freelancer yang tepat dengan cepat, dan dapatkan hasil kerja berkualitas tepat waktu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPageSecCard;
