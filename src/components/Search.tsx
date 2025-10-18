const Search = () => {
  return (
    <div>
      <div className="flex gap-6 w-[343px] lg:w-[480px]  ps-8 py-4 bg-[#fff] shadow-md rounded-[5px]">
        <img src="/searchWhite.svg" alt="" />
        <input type="text" placeholder="Search for a country…" className="focus:outline-none text-[#848484] w-full" />
      </div>
    </div>
  );
};

export default Search;
