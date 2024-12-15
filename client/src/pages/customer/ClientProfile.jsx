import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


const ClientProfile = () => {
  const { user, updateUser } = useAuth();
  const [passwordChangeEnabled, setPasswordChangeEnabled] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    profile_picture: user.profile_picture || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "png"]),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
    ],
  });
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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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
      const updateData = {
        ...formData,
        profile_picture: filesContent[0]?.content || user.profile_picture,
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

  return (
    <div className="profile-bg fixed inset-0 flex flex-col justify-center items-center">
      <nav className="w-full fixed top-0 left-0 m-5">
        <Link
          to="/"
          className="text-2xl font-bold ml-5 text-gray-900 md:text-2xl dark:text-white"
        >
          GigNesia
        </Link>
      </nav>
      <div className="max-w-screen-lg w-full bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <Link to="/" className="inline-flex items-center text-xl ">
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
            <span className="">Kembali</span>
          </Link>
        </div>

        <div className="flex flex-col w-full p-5">
          {filesContent.length > 0 ? (
            filesContent.map((file, index) => (
              <div key={index}>
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  alt={file.name}
                  src={file.content}
                />
              </div>
            ))
          ) : (
            <img
              className="mx-auto mb-4 w-36 h-36 rounded-full"
              src={user.profile_picture}
              alt="Default Profile"
            />
          )}
          <div className="p-5 border bg-gray-300 rounded-3xl w-3/4 mx-auto text-center">
            <p>
              Drag & Drop your files or{" "}
              <span
                className="underline hover:cursor-pointer"
                onClick={() => openFilePicker()}
              >
                Browse
              </span>
            </p>
          </div>
          <div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required=""
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Addresess
                </label>
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required=""
                  />
                </div>
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
                className="w-1/4 text-white bg-[#6051c2] shadow active:scale-[.97] hover:scale-[1.03] transition duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;