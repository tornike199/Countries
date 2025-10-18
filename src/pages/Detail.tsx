import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Country } from "../types";
import { useAppContext } from "../context/AppContext";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const { darkMode } = useAppContext();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get<Country>(`http://localhost:8000/countries/${id}`);
        setCountry(response.data);
      } catch (error) {
        console.error("Failed to fetch country:", error);
      }
    };

    if (id) fetchCountry();
  }, [id]);

  if (!country) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className={`${darkMode ? "bg-[#202C36] text-white" : "bg-[#FFFFFF] text-[#111517]"} min-h-screen transition-colors duration-300`}>
      <div className="px-7 lg:px-20 py-10 ">
        <Link
          to="/"
          className={`flex items-center gap-3 px-6 py-2 rounded shadow-md w-fit mb-14 
          ${darkMode ? "bg-[#2B3844] text-white" : "bg-white text-[#111517]"}`}
        >
          <img src={darkMode ? "/public/arrowBackWhite.svg" : "/public/arrowBackBlack.svg"} alt="arrow" className="w-4 h-4" />
          Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <img src={country.flags?.svg} alt={country.name} className="w-full max-w-[560px] rounded-lg shadow-md" />

          <div className="w-full max-w-[600px] mb-[20px]">
            <h1 className="text-2xl lg:text-3xl font-extrabold mb-8">{country.name}</h1>

            <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Native Name:</span> {country.nativeName}
                </p>
                <p>
                  <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span> {country.subregion}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span> {country.capital}
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Top Level Domain:</span> {country.topLevelDomain.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span> {country.currencies?.map((c) => c.name).join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Languages:</span> {country.languages?.map((l) => l.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="font-semibold mr-2">Border Countries:</p>
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode) => (
                  <span
                    key={borderCode}
                    className={`px-6 py-1 rounded shadow text-sm 
                    ${darkMode ? "bg-[#2B3844] text-white" : "bg-white text-[#111517]"}`}
                  >
                    {borderCode}
                  </span>
                ))
              ) : (
                <span>No border countries</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
