import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import type { Country } from "../types";

interface CardProp {
  country: Country;
}

const Card: React.FC<CardProp> = ({ country }) => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <Link to={`/country/${country.id}`}>
        <div className={`w-[264px]  duration-300 transition-all cursor-pointer hover:mt-[-10px] ${darkMode ? "bg-[#2B3844] text-[#fff]" : "bg-[#fff] text-[#111517]"}  shadow-lg rounded-[5px]`}>
          <img className="mb-[24px] h-[200px]" src={country.flags?.png} alt="flag" />
          <div className="p-[24px]">
            <h2 className="mb-[16px] font-extrabold ">{country.name}</h2>
            <p className="mb-[8px]">
              <span className="font-bold">Population:</span> {country.population}
            </p>
            <p className="mb-[8px]">
              <span className="font-bold">region:</span> {country.region}
            </p>
            <p className="mb-[20px]">
              <span className="font-bold">capital:</span> {country.capital}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
