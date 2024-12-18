import SideNavbar from "../../components/SideNavbar";
import { useEffect, useState } from "react";
import { useServices } from "../../context/ServiceContex";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ManageServices = () => {
  const {
    services,
    categories,
    createService,
    deleteService,
    updateServiceStatus,
    fetchServices,
  } = useServices();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [servicePerPage] = useState(5);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    freelancer_id: "",
  });

  const filteredServices = services.filter(
    (service) => service.freelancer_id._id === user._id
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    user.whatsapp_number.length > 6
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [user.whatsapp_number]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createService(formData);
      response &&
        Swal.fire(
          "Service berhasil dibuat!",
          "Service berhasil dibuat",
          "success"
        ).then(() => {
          fetchServices();
        });
    } catch (err) {
      err.status === 409
        ? Swal.fire(
            "Service sudah ada sebelumnya!",
            "Gunakan nama service yang lain",
            "error"
          )
        : console.log(err);
    }
  };
  const handleUpdateServiceStatus = async (serviceId) => {
    try {
      const { value: status } = await Swal.fire({
        title: "Update Service Status",
        input: "select",
        inputOptions: {
          true: "Aktif",
          false: "Nonaktif",
        },
        inputPlaceholder: "Select status",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Pilih status service!";
          }
        },
      });

      if (status) {
        const booleanStatus = status === "true";
        await updateServiceStatus(serviceId, { status: booleanStatus });
        Swal.fire({
          title: "Status berhasil diubah!",
          text: `Status service berhasil diubah ke ${status}`,
          icon: "success",
        }).then(() => {
          fetchServices();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Gagal mengubah status service",
        icon: "error",
      });
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const result = await Swal.fire({
        title: "Apa kamu yakin?",
        text: "Kamu tidak dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, saya yakin!",
      });

      if (result.isConfirmed) {
        await deleteService(serviceId);

        Swal.fire({
          title: "Berhasil Dihapus!",
          text: "Service berhasil dihapus.",
          icon: "success",
        }).then(() => {
          fetchServices();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Gagal menghapus service",
        icon: "error",
      });
    }
  };

  const indexOfLastService = currentPage * servicePerPage;
  const indexOfFistService = indexOfLastService - servicePerPage;
  const currentServices = filteredServices
    .slice()
    .reverse()
    .slice(indexOfFistService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredServices.length / servicePerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <>
      <SideNavbar activeId={"3"} />
      <main className="p-4 md:ml-64 h-auto pt-20">
        <h1 className="text-3xl font-bold mb-4">Kelola Jasa</h1>
        <div className="p-5 bg-white shadow rounded-lg border-gray-300 dark:border-gray-600 w-full mb-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="service_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Judul Jasa
                </label>
                <input
                  type="text"
                  id="service_title"
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Judul jasa"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Harga
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="ps-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="20000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kategori
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.category_id}
                onChange={handleChange}
                name="category_id"
                required
              >
                <option defaultValue={"Pilih kategori..."}>
                  Pilih kategori...
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deskripsikan jasa..."
                value={formData.description}
                onChange={handleChange}
                name="description"
                required
              ></textarea>
            </div>
            <button
              disabled={isDisabled}
              type="submit"
              className={`text-white  ${
                isDisabled ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
              }   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              Tambah jasa
            </button>
            <span className="text-xs italic">
              {isDisabled
                ? " *Update nomor telepon di profile sebelum menambah jasa/service!"
                : null}
            </span>
          </form>
        </div>
        <div className="relative overflow-x-auto rounded-lg shadow mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Judul
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis Jasa
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service, index) => (
                <tr
                  key={service._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{service.title}</td>
                  <td className="px-6 py-4">{service.description}</td>

                  <td className="px-6 py-4">
                    {service.status ? (
                      <span className="bg-green-200 p-2 rounded text-green-900">
                        Aktif
                      </span>
                    ) : (
                      <span className="bg-red-200 p-2 rounded text-red-900">
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 relative ">
                    <div className="relative inline-block space-x-2 ">
                      <button
                        onClick={() => handleUpdateServiceStatus(service._id)}
                      >
                        <svg
                          className="w-6 h-6 text-blue-500 dark:text-white"
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
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>

                      <button onClick={() => handleDeleteService(service._id)}>
                        <svg
                          className="w-6 h-6 text-red-500 dark:text-white"
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
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
export default ManageServices;
