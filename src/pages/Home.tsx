import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  return (
    <div>
      <main className="py-12 px-20 bg-[#FAFAFA]">
        <div className="flex justify-between">
          <Search></Search>
        </div>

        <Card></Card>
      </main>
    </div>
  );
};

export default Home;
