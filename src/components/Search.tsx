import { useAppContext } from "../context/AppContext";

const Search = () => {
  const { darkMode, searchTerm, setSearchTerm } = useAppContext();

  return (
    <div>
      <div className={`flex gap-6 w-[343px] lg:w-[480px] ps-8 py-4 transition-colors duration-300 ${darkMode ? "bg-[#2B3844]" : "bg-[#fff]"} shadow-lg rounded-[5px]`}>
        <img src={`${darkMode ? "/public/searchForBlack.svg" : "/public/searchForWhite.svg"}`} alt="search icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a country…"
          className={`focus:outline-none w-full transition-colors duration-300 ${darkMode ? "text-white placeholder:text-white" : "text-[#848484] placeholder:text-[#848484]"}`}
        />
      </div>
    </div>
  );
};

export default Search;
