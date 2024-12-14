import temp_prof from "../assets/temp_prof.jpeg";

const FreelancerCard = () => {
  return (
    <div className="flex text-center justify-center items-center w-[18rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            Frontend / Backend
          </p>
          <p className="font-bold">From : Rp.100.000</p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;
