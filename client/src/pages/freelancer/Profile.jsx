import { useEffect, useState } from "react";
import ClientReview from "../../components/ClientReview";
import SideNavbar from "../../components/SideNavbar";
import { useAuth } from "../../context/AuthContext";
import { useServices } from "../../context/ServiceContex";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { getReviews } = useServices();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewPerPage] = useState(5);

  const [formData, setFormData] = useState({
    name: user.name || "",
    whatsapp_number: user.whatsapp_number || "",
    bio: user.bio || "",
    profile_picture: user.profile_picture || "",
    portfolio_urls: user.portfolio_urls ? user.portfolio_urls.join(", ") : "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
        try {
          const response = await getReviews(user._id);
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    fetchReviews();
  }, []);

  const [passwordChangeEnabled, setPasswordChangeEnabled] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordCheckbox = (e) => {
    setPasswordChangeEnabled(e.target.checked);
    if (!e.target.checked) {
      setFormData((prevState) => ({
        ...prevState,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwordChangeEnabled) {
        if (formData.newPassword !== formData.confirmNewPassword) {
          return Swal.fire({
            icon: "error",
            title: "Password Tidak Cocok",
            text: "Konfirmasi password harus sama dengan password baru",
          });
        }

        if (formData.newPassword.length < 6) {
          return Swal.fire({
            icon: "error",
            title: "Password Terlalu Pendek",
            text: "Password harus minimal 6 karakter",
          });
        }
      }

      const portfolioUrls = formData.portfolio_urls
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      const updateData = {
        ...formData,
        portfolio_urls: portfolioUrls,
        whatsapp_number: formData.whatsapp_number.startsWith("62")
          ? formData.whatsapp_number
          : `62${formData.whatsapp_number}`,
      };

      if (passwordChangeEnabled) {
        updateData.oldPassword = formData.oldPassword;
        updateData.newPassword = formData.newPassword;
      }

      Object.keys(updateData).forEach(
        (key) => updateData[key] === "" && delete updateData[key]
      );
      await updateUser(user._id, updateData);

      Swal.fire({
        icon: "success",
        title: "Profil Berhasil Diperbarui",
        text: "Informasi profil Anda telah diupdate",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui Profil",
        text: error.message || "Terjadi kesalahan saat memperbarui profil",
      });
    }
  };

  const indexOfLastReview = currentPage * reviewPerPage;
  const indexofFirstReview = indexOfLastReview - reviewPerPage;
  const currentReviews = reviews
    .slice()
    .reverse()
    .slice(indexofFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(reviews.length / reviewPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <>
      <SideNavbar activeId={"5"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="p-5 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 w-full mb-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  autoComplete="on"
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="whatsapp_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  WhatsApp
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    +62
                  </div>
                  <input
                    type="text"
                    id="whatsapp_number"
                    value={formData.whatsapp_number.replace(/^62/, "")}
                    onChange={handleChange}
                    className="ps-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="812xxxxxxx"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tulis tentang kamu..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="profile_picture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Foto Profil URL
              </label>
              <input
                type="text"
                id="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://example.com/foto.jpg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="portfolio_urls"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Portfolio URLs{" "}
                <span className="italic text-gray-500 text-xs">
                  *pisahkan per url dengan tanda koma ( , )
                </span>
              </label>
              <textarea
                id="portfolio_urls"
                rows="4"
                value={formData.portfolio_urls}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://example.com/port.jpg, https://example.com/port2.jpg"
              ></textarea>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="changePassword"
                checked={passwordChangeEnabled}
                onChange={handlePasswordCheckbox}
                className="mr-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="changePassword"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Ganti Password?
              </label>
            </div>

            {passwordChangeEnabled && (
              <div className="grid gap-6 mb-4">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password Lama
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukkan password lama"
                    required={passwordChangeEnabled}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Masukkan password baru"
                    required={passwordChangeEnabled}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Konfirmasi password baru"
                    required={passwordChangeEnabled}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Perbarui Profil
            </button>
          </form>
        </div>
        <div className="p-5 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 w-full mb-2">
          <h1 className="text-3xl font-bold mb-4">Ulasan Klien</h1>
          {reviews.length > 0 ? (
            currentReviews.map((review, idx) => (
              <div key={idx} className="mb-4 border-b border-gray-300 ">
                Ulasan pada jasa {review.orderId.service_id.title}
                <ClientReview
                  review={review.comment}
                  name={review.userId.name}
                  rating={review.rating}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada ulasan.
            </p>
          )}
        </div>
        <nav aria-label="Page navigation" className="mt-4 flex justify-center">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {getPageNumbers().map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  aria-current={currentPage === number ? "page" : undefined}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === number
                      ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
};

export default Profile;
