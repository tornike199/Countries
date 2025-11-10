import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import type { Country } from "../types/types";

interface CardProp {
  country: Country;
}

const Card: React.FC<CardProp> = ({ country }) => {
  const { darkMode } = useAppContext();

  return (
    <div className="flex justify-center">
      <Link to={`/country/${country.cca3}`}>
        <div
          className={`w-[264px] rounded-[5px] overflow-hidden shadow-lg transform transition-all duration-500 cursor-pointer
            ${darkMode ? "bg-[#2B3844] text-[#fff]" : "bg-white text-[#111517]"}
            hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl`}
        >
          <div className="overflow-hidden">
            <img className="h-[200px] w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" src={country.flags?.png} alt={`${country.name?.common} flag`} />
          </div>

          <div className="p-[24px]">
            <h2 className="mb-[16px] font-extrabold truncate">{country.name?.common}</h2>

            <p className="mb-[8px]">
              <span className="font-bold">Population:</span> {country.population.toLocaleString()}
            </p>

            <p className="mb-[8px]">
              <span className="font-bold">Region:</span> {country.region}
            </p>

            {country.capital && (
              <p className="mb-[20px]">
                <span className="font-bold">Capital:</span> {country.capital[0]}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
