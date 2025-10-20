import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useAppContext } from "../context/AppContext";

type PaginationProps<T> = {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T) => React.ReactNode;
};

function Pagination<T>({ items, itemsPerPage, renderItem }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const { darkMode } = useAppContext();

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => <React.Fragment key={index}>{renderItem(item)}</React.Fragment>)
        ) : (
          <p className="col-span-full text-center text-lg font-medium">No items found.</p>
        )}
      </div>

      {items.length > itemsPerPage && (
        <div className="mt-10 flex justify-center">
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            forcePage={currentPage}
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center flex-wrap gap-2 mt-8"
            pageClassName={`${darkMode ? "border border-[#b0b0b0]" : "border border-gray-300"} shadow-lg rounded-md overflow-hidden`}
            previousClassName={`${darkMode ? "border border-[#b0b0b0]" : "border border-gray-300"} shadow-lg rounded-md overflow-hidden`}
            nextClassName={`${darkMode ? "border border-[#b0b0b0]" : "border border-gray-300"} shadow-lg rounded-md overflow-hidden`}
            breakClassName={`${darkMode ? "border border-[#b0b0b0]" : "border border-gray-300"} shadow-lg rounded-md overflow-hidden`}
            pageLinkClassName={`block px-3 py-1 cursor-pointer transition-colors ${
              darkMode ? "bg-[#2B3844] text-white border-[#3C4D5E] hover:bg-[#394952]" : "bg-white text-[#111517] border-gray-300 hover:bg-gray-100"
            }`}
            previousLinkClassName={`block px-3 py-1 cursor-pointer ${
              darkMode ? "bg-[#2B3844] text-white border-[#3C4D5E] hover:bg-[#394952]" : "bg-white text-[#111517] border-gray-300 hover:bg-gray-100"
            }`}
            nextLinkClassName={`block px-3 py-1 cursor-pointer ${
              darkMode ? "bg-[#2B3844] text-white border-[#3C4D5E] hover:bg-[#394952]" : "bg-white text-[#111517] border-gray-300 hover:bg-gray-100"
            }`}
            breakLinkClassName={`block px-3 py-1 cursor-default ${darkMode ? "bg-[#2B3844] text-white border-[#3C4D5E]" : "bg-white text-[#111517] border-gray-300"}`}
            activeClassName="!bg-blue-500 !text-white !border-blue-500"
          />
        </div>
      )}
    </div>
  );
}

export default Pagination;
