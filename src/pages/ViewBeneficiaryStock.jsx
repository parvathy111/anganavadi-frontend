import React, { useEffect, useState } from "react";
import { useUser } from "../store/useUser";
import api from "../config/axiosinstance";
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";
import { PackageCheck, ArrowLeft, ArrowRight } from "lucide-react";

const ViewBeneficiaryStock = () => {
  const { user, isLoading } = useUser();
  const [stock, setStock] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 3;

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await api.get(`/worker-available-stock/${user.anganwadiNo}`);
        setStock(res.data);
      } catch (err) {
        console.error("Error fetching stock:", err);
      }
    };

    if (!isLoading && user?.anganwadiNo) {
      fetchStock();
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  // Pagination logic
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stock.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(stock.length / stocksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BeneficiaryLayout>
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 mt-6">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold text-gray-800">
          <PackageCheck size={28} className="text-[#ff6f00]" />
          Available Stock
        </h1>
        <p className="text-gray-500 mt-2 mb-10">
          These items are currently available in your Anganwadi.
        </p>
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-10">
        {currentStocks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No stock available currently.
          </div>
        ) : (
          currentStocks.map((item) => (
            <div
              key={item._id}
              className="bg-white w-3/4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center mx-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {stock.length > stocksPerPage && (
        <div className="flex justify-center mt-4 gap-4 items-center pb-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center gap-2 bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <span className="text-xs text-gray-500">({stock.length} items)</span>
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center gap-2 bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </BeneficiaryLayout>
  );
};

export default ViewBeneficiaryStock;
