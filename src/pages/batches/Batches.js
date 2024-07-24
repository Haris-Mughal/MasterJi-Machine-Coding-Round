import { useState } from "react";
import { initialBatches } from "./mockData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Batches = () => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBatches = initialBatches.filter((batch) =>
    batch.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredBatches.length / rowsPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="p-8 bg-[#f9c3fa] min-h-screen">
      <div className="text-[#444B79] font-bold text-[80px] text-center pb-6">
        Chai aur Code
      </div>
      <div className="bg-white p-8 rounded-xl me-[110px]">
        <div className="">
          <div className=" font-bold text-[40px] ">Batches</div>
          <div className=" text-[20px] text-[#4B4747] leading-[24px] ">
            Create learner&apos;s batch and share information at the same time.
          </div>
        </div>
        <div className="flex py-[40px]">
          <input
            type="text"
            placeholder="Search by Title (alt+k or cmd+k)"
            value={search}
            onChange={handleSearchChange}
            className="border p-2 w-[332px] rounded outline-none "
          />
          <button className="bg-[#6C6BAF] w-[116px] rounded text-white px-4 py-2 ml-2">
            Search
          </button>
        </div>
        <table className="w-full bg-white rounded-xl border shadow-md">
          <thead>
            <tr className="rounded-t-xl bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Validity/Expiry</th>
              <th className="border rounded-tr-xl p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBatches.map((batch, i) => (
              <tr key={batch.id || i}>
                <td className="border-l border-r p-4 gap-[17px] flex items-center">
                  <img
                    src={batch.imageUrl}
                    alt={batch.name}
                    className="w-[106px] h-[60px] object-cover rounded-md mr-2"
                  />
                  <span>{batch.name}</span>
                </td>
                <td className="border-l border-r p-4">{batch.startDate}</td>
                <td className="border-l border-r p-4">{batch.endDate}</td>
                <td className="border-l border-r p-4">{batch.price}</td>
                <td className="border-l border-r p-4">{batch.validity}</td>
                <td className="border-l border-r p-4">
                  <span
                    className={`border rounded p-1 ${
                      batch.status === "Published"
                        ? "border-[#4ED04B] bg-[#d9fcd8]"
                        : "border-gray-400 bg-gray-200"
                    }`}
                  >
                    {batch.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center gap-4 mt-4">
          <div>
            <label htmlFor="rowsPerPage" className="mr-2">
              Rows per page
            </label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border p-2 rounded-md"
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="flex">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeftIcon className="w-10 h-10" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className={`p-2 ml-2 ${
                currentPage >= totalPages ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRightIcon className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batches;
