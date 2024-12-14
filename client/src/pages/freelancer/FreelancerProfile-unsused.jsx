import temp_prof from "../../assets/temp_prof.jpeg";

import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from "use-file-picker/validators";

const FreelancerProfile = () => {
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
  return (
    <div className="freelancer-profile-bg h-screen">
      <div className="fixed inset-0 flex items-center justify-center pt-8 overflow-auto">
        <div className="flex space-x-4">
          <div className="flex flex-col justify-center bg-[#F2F2F2] items-center other-side-profile shadow w-[24rem] h-[24rem] rounded-lg">
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
                src={temp_prof}
                alt="Default Profile"
              />
            )}
            <div className="p-5 border bg-gray-300 rounded-3xl w-4/5 mx-auto">
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
          </div>
          <div className="w-[30rem] bg-[#F2F2F2] shadow rounded-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className=" text-start text-xl">Profile</div>
              <form className="space-y-4 md:space-y-6" action="#">
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
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F2F2F2]"
                  >
                    Email Addresess
                  </label>
                  <div className="relative w-full">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#F2F2F2] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#F2F2F2]"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#F2F2F2] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bio
                  </label>
                  <div className="relative w-full">
                    <textarea
                      id="bio"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Add your bio description about you..."
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor Telepon
                  </label>
                  <div className="relative w-full">
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0812xxxxxxxx"
                      required=""
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-[#F2F2F2] bg-[#6051c2] shadow active:scale-[.97] hover:scale-[1.03] transition duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
