import Card from "../components/Card";
import Filter from "../components/Filter";
import Search from "../components/Search";

const Home = () => {
  return (
    <div>
      <main className=" px-7  py-12 lg:px-20 bg-[#FAFAFA]">
        <div className="flex justify-between flex-col gap-5 lg:flex-row">
          <Search></Search>
          <Filter></Filter>
        </div>

        <Card></Card>
      </main>
    </div>
  );
};

export default Home;
