import temp_prof from "../assets/temp_prof.jpeg";

const ClientCard = () => {
  return (
    <div className="flex text-center justify-center items-center w-[32rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col p-5">
        <img
          className="mx-auto mb-4 w-36 h-36 rounded-full"
          src={temp_prof}
          alt="Avatar"
        />
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white underline">
            Edy Mikhael
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Project membuat website untuk....
          </p>
          <div className="flex gap-2">
            <button className="border bg-red-500 rounded-3xl w-full h-12 shadow hover:bg-red-600">
              Tolak
            </button>
            <button className="border bg-green-500 rounded-3xl w-full h-12 shadow hover:bg-green-600">
              Terima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
