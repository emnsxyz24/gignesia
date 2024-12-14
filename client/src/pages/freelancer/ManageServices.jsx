import SideNavbar from "../../components/SideNavbar";
import { Loading } from "../../components/Loadings";
import { useState } from "react";
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
  } = useServices();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    freelancer_id: "",
  });

  if (!services) {
    return <Loading />;
  }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    createService(formData);
    window.location.reload();
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
            return "You need to select a status!";
          }
        },
      });

      if (status) {
        const booleanStatus = status === 'true';
        await updateServiceStatus(serviceId, {status :booleanStatus});
        Swal.fire({
          title: "Status Updated!",
          text: `Service status has been set to ${status}`,
          icon: "success",
        }).then(() => {
          window.location.reload();
        })
        
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update service status",
        icon: "error",
      })
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this service deletion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteService(serviceId);

        Swal.fire({
          title: "Deleted!",
          text: "The service has been deleted.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete the service",
        icon: "error",
      });
    }
  };
  return (
    <>
      <SideNavbar activeId={"3"} />
      <main className="p-4 md:ml-64 h-auto pt-20 ">
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
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tambah Jasa
            </button>
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
              {filteredServices.map((service, index) => (
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
      </main>
    </>
  );
};
export default ManageServices;
