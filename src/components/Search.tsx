const Search = () => {
  return (
    <div>
      <div className="flex gap-6 w-[480px]  px-8 py-4 bg-[#fff] shadow-md rounded-[5px]">
        <img src="/searchWhite.svg" alt="" />
        <input type="text" placeholder="Search for a country…" className="focus:outline-none text-[#848484]" />
      </div>
    </div>
  );
};

export default Search;
