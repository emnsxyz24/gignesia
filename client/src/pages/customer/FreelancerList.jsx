import { useServices } from "../../context/ServiceContex";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PageFreelancer_Client = () => {
  const { services, categories } = useServices();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicePerPage] = useState(12);

    const filteredServices = services.filter((service) => {
      const activeService = service.status === true;
  
      const matchesCategory =
        !selectedCategory || service.category_id.name === selectedCategory;
  
      const matchesSearch =
        searchTerm === "" ||
        service.freelancer_id.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        service.title.toLowerCase().includes(searchTerm.toLowerCase());
  
      return matchesCategory && matchesSearch && activeService;
    });


  const handleCategorySelect = (categoryName) => {
    setSearchTerm("");    
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
    setInputSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputSearch);
    setSelectedCategory(null);
  };

  const indexOfLastService = currentPage * servicePerPage;
  const indexOfFirstService = indexOfLastService - servicePerPage;
  const currentServices = filteredServices
    .slice()
    .reverse()
    .slice(indexOfFirstService, indexOfLastService);

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="flex justify-center h-[10rem] text-center border-t border-black mb-4">
          <h1 className="my-auto font-bold text-5xl">
            Daftar Freelancer
            <hr className="mt-2 border-black" />
          </h1>
        </div>
        <div className="mt-4 mb-4">
          <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-[#F2F2F2]"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#F2F2F2] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cari Freelancer..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-[#F2F2F2] absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-5 gap-3 flex-wrap">
            {categories.map((category, idx) => (
              <button
                key={idx + 1}
                onClick={() => handleCategorySelect(category.name)}
                className={`bg-gray-200 rounded-lg p-2 hover:bg-gray-400 
                ${selectedCategory === category.name ? "bg-gray-400" : ""}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3 p-5">
          {currentServices.map((service, idx) => (
            <Link
              to={`/details/${service._id}`}
              key={idx + 1}
              className="flex text-center justify-center items-center w-[18rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col p-5">
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src={service.freelancer_id.profile_picture}
                  alt="Avatar"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white underline">
                    {service.freelancer_id.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {service.title}
                  </p>
                  <p className="font-bold">
                    Mulai dari Rp{service.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
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
      </div>
      <Footer />
    </div>
  );
};

export default PageFreelancer_Client;
