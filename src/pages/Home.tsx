import { useEffect, useState } from "react";
import { getCountries } from "../api";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { useAppContext } from "../context/AppContext";
import type { Country } from "../types";

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
        <div className="flex justify-between flex-col gap-5 lg:flex-row mb-12">
          <Search />
          <Filter />
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-20">
            {filteredData.length > 0 ? (
              filteredData.map((country) => <Card key={country.id} country={country} />)
            ) : (
              <p className="col-span-full text-center text-lg font-medium">No countries found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
