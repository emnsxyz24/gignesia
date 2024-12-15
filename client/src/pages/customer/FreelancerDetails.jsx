import Navbar from "../../components/Navbar";
import { Loading } from "../../components/Loadings";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useServices } from "../../context/ServiceContex";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FreelancerDetails = () => {
  const { serviceId } = useParams();

  const { fetchDetailService, createOrder } = useServices();
  const [detailService, setDetailService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  useEffect(() => {
    fetchDetailService(serviceId).then((data) => {
      setDetailService(data);
      setIsLoading(false);
      console.log(data);
    });
  }, [serviceId]);

  if (isLoading) return <Loading />;
  const handleOrderClick = async () => {
    Swal.fire({
      title: "Konfirmasi Pesanan",
      html: `
        <div class="text-left">
          <p><strong>Nama Freelancer:</strong> ${
            detailService?.freelancer_id?.name
          }</p>
          <p><strong>Layanan:</strong> ${detailService?.title}</p>
          <p><strong>Total Pesanan:</strong> 1</p>
          <p><strong>Harga Layanan:</strong> Rp${detailService?.price.toLocaleString(
            "id-ID"
          )}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi Pesanan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#6051c2",
      cancelButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          freelancer_id: detailService.freelancer_id._id,
          service_id: detailService._id,
        };
        try {
          setIsPaymentLoading(true);
          const paymentCreated = await createOrder(data);
          window.open(paymentCreated.payment_url, "_blank");
        } catch (err) {
          console.error("Error creating order:", err);
          Swal.fire({
            title: "Error",
            text: "Gagal membuat pesanan",
            icon: "error",
          });
        } finally {
          setIsPaymentLoading(false);
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <Navbar />
      {isPaymentLoading && <Loading />}
      <div className="my-auto px-12">
        <div className="container mx-auto justify-center max-w-screen-lg p-8 border rounded-xl shadow bg-[#F2F2F2]">
          <Link to="/freelancers" className="inline-flex items-center text-xl">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            <span>Kembali</span>
          </Link>
          <div className="flex justify-center flex-col lg:flex-row items-center  text-xl">
            <div className="flex flex-col w-[30rem] text-center p-5 ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={detailService?.freelancer_id?.profile_picture}
                alt="Avatar"
              />
              <div className="p-5">
                <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white underline">
                  {detailService?.freelancer_id?.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {detailService?.title}
                </p>
                <p className="font-bold">
                  From : Rp{detailService?.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="p-5 text-justify">
              <h1 className="font-bold mb-2">Deskripsi :</h1>
              <p className="description">{detailService?.description}</p>
              <h1 className="font-bold mb-2 mt-3">Portfolio :</h1>
              <div className="inline-flex flex-col">
                {detailService?.freelancer_id.portfolio_urls.length > 0 ? (
                  detailService.freelancer_id.portfolio_urls.map((url, idx) => (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={url}
                      className="justify-center items-center mb-2"
                    >
                      Portfolio {idx + 1}
                    </a>
                  ))
                ) : (
                  <span>-</span>
                )}
                <br />
                <span className="text-xs italic">
                  *Klik link portfolio jika ada untuk melihat lebih lanjut
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col lg:flex-row items-center gap-2 mt-4">
          <button
            onClick={handleOrderClick}
            className="border bg-[#6051c2] rounded-3xl w-1/5 p-3 shadow hover:bg-[#463c8d]"
          >
            Order langsung
          </button>
          <a
            target="_blank"
            href="https://wa.me/6211111111111"
            className="border bg-green-500 rounded-3xl w-1/5 p-3 shadow text-center hover:bg-green-600"
          >
            Kirim pesan
          </a>
        </div>
      </div>
    </div>
  );
};
export default FreelancerDetails;
