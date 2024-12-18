import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import girl from "../assets/icons/girl.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Loading } from "../components/Loadings";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col ">
        {loading && <Loading />}
      <div className=" register-page mx-auto md:mx-0 ">
        <nav className="relative top-0 left-0 p-5 z-10">
          <Link
            to="/"
            className="text-2xl font-bold ml-5 text-gray-900 md:text-2xl dark:text-white"
          >
            GigNesia
          </Link>
        </nav>
        <div className="flex items-center justify-center px-4 py-8  h-screen">
          <div className="flex max-w-4xl w-full ">
            <div className="form-side lg:w-[30rem] w-full mx-auto bg-[#F2F2F2] shadow rounded-l-lg">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <img className="w-20" src={logo} alt="logo"></img>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Buat Akun Anda
                  </h1>
                </div>

                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Full Name
                    </label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Agus sedih"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email Address
                    </label>
                    <div className="relative w-full">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="">Select your role</option>
                      <option value="client">User/Customer</option>
                      <option value="freelancer">Freelancer</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-[#6051c2] shadow active:scale-[.97] hover:scale-[1.03] transition duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign Up
                  </button>

                  <hr className="hr-text" data-content="OR" />

                  <Link to="/login">
                    <button
                      type="button"
                      className="mt-3 w-full text-[#FD7401] bg-white active:scale-[.97] hover:scale-[1.03] transition duration-200 border border-[#FD7401] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign in
                    </button>
                  </Link>
                </form>
              </div>
            </div>
            <div className="other-side bg-green w-[30rem] shadow rounded-r-lg relative justify-center items-center flex">
              <div className="border bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between h-96">
                <div className="text-left">
                  <h2 className="text-lg font-bold text-white">
                    Peluang besar memanggil Anda.
                  </h2>
                  <p className="text-lg text-white">
                    Mulailah perjalanan Anda. <br />
                    Create Account Sekarang!
                    <br />
                  </p>
                </div>

                <div className="self-end">
                  <img
                    src={girl}
                    alt="Person"
                    width={188}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
