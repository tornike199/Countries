import { useState } from "react";

const Filter = () => {
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
      <div onClick={toggleDropdown} className="py-4 px-6 bg-[#fff] w-[200px] relative shadow-md rounded-[5px] text-[#111517]">
        <div className="flex items-center justify-between">
          <h2>{selectedRegion || "Filter by Region"}</h2>
          <div>
            <img src="/public/arrowBlack.svg" alt="arrow" className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`} />
          </div>
        </div>

        <div className={`absolute bg-[#fff] flex flex-col gap-2 w-full left-0 py-4 px-6 transition-all duration-200 shadow-md rounded-[5px] ${isOpen ? "block bottom-[-190px]" : "hidden"}`}>
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
