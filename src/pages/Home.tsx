import { useEffect, useState } from "react";
import { getCountries } from "../api";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { useAppContext } from "../context/AppContext";
import type { Country } from "../types/types";
import Pagination from "../components/Pagination";
import Slider from "../components/Slider";

const Home = () => {
  const { darkMode, searchTerm, selectedRegion } = useAppContext();
  const [data, setData] = useState<Country[]>([]);

  const fetchData = async () => {
    try {
      const countries = await getCountries();
      setData(countries);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      <main className={`px-7 py-12 lg:px-20 transition-colors duration-300  ${darkMode ? "bg-[#202C36]" : "bg-[#FAFAFA]"}`}>
        <div className="slider flex justify-center mb-10">
          <Slider data={data}></Slider>
        </div>
        <div className="flex justify-between flex-col gap-5 lg:flex-row mb-12">
          <Search />
          <Filter />
        </div>

        <div className="flex justify-center ">
          <Pagination
            key={`${searchTerm}-${selectedRegion}`} // 🔥 resets pagination when filters change
            items={filteredData}
            itemsPerPage={12}
            renderItem={(country) => <Card key={country.id} country={country} />}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
