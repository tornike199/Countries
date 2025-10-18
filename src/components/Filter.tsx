import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Filter = () => {
  const { darkMode } = useAppContext();

  const regions: string[] = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    setIsOpen(false);
    console.log("Selected region:", region);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleDropdown}
        className={`py-4 px-6 w-[200px] relative shadow-md rounded-[5px] cursor-pointer transition-colors duration-300
        ${darkMode ? "bg-[#2B3844] text-white" : "bg-white text-[#111517]"}`}
      >
        <div className="flex items-center justify-between">
          <h2>{selectedRegion || "Filter by Region"}</h2>
          <div>
            <img src={`${darkMode ? "/public/arrowWhite.svg" : "/public/arrowBlack.svg"}`} alt="arrow" className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`} />
          </div>
        </div>

        <div
          className={`absolute flex flex-col gap-2 w-full left-0 py-4 px-6 transition-all duration-300 shadow-md rounded-[5px]
          ${isOpen ? "block bottom-[-190px]" : "hidden"}
          ${darkMode ? "bg-[#2B3844] text-white" : "bg-white text-[#111517]"}`}
        >
          {regions.map((region) => (
            <h2 key={region} onClick={() => handleRegionClick(region)} className="cursor-pointer hover:font-semibold">
              {region}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
