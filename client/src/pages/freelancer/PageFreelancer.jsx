import Navbar from "../../components/Navbar";
import ClientCard from "../../components/ClientCard";

const PageFreelancer = () => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
        <div key={i+1}>
        <ClientCard />

        </div>
    );
  }
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-wrap justify-center gap-5 px-36 mt-12 p-5">{rows}</div>
    </div>
  );
};

export default PageFreelancer;
