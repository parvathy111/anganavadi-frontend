import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerLayout from "../layouts/WorkerLayout";
import {
  Search,
  Tag,
  ShoppingCart,
  PackageCheck,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"; // Added ArrowLeft and ArrowRight imports
import api from "../config/axiosinstance";

const OrderStock = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [anganwadiNo, setAnganwadiNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      
  
        const res = await api.get('products/all')
  
        console.log("Fetched Products:", res);
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.productname.toLowerCase().includes(query) ||
        product.itemid.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const openOrderModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setOrderQuantity("");
    setAnganwadiNo("");
    setSubmitting(false);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        productname: selectedProduct.productname,
        itemid: selectedProduct.itemid,
        quantity: orderQuantity,
        anganwadiNo: anganwadiNo,
        image: selectedProduct.image,
      };

      const res = await axios.post(
        "http://localhost:5000/orders/create",
        payload
      );

      if (res.status === 201) {
        setNotification({
          type: "success",
          message: res.data.message || "Order placed successfully!",
        });
        closeModal();
      } else {
        setNotification({
          type: "error",
          message: "Something went wrong. Please try again!",
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to place the order.";
      setNotification({ type: "error", message: errorMsg });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  if (loading) {
    console.log("Loading..."); // Check if the loading state is working
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <WorkerLayout>
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

    {/* Header and Search bar in the same row */}
<div className="flex justify-between items-center mb-4 px-4">
  {/* Header */}
  <div>
    <h1 className="flex items-left gap-2 text-3xl font-extrabold text-gray-800 mb-3 mt-5">
      <PackageCheck size={28} className="text-[#ff6f00]" />
      Available Stock
    </h1>
    <p className="text-gray-500 mb-4">These are the available stock.</p>
  </div>

  {/* Search bar aligned to the right */}
  <div className="relative w-full max-w-md">
    <Search className="absolute top-2.5 left-3 text-gray-400" size={20} />
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Search by product name or item ID..."
      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6f00] focus:outline-none shadow-sm"
    />
  </div>
</div>

      {/* Product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-2">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.productname}
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#ff7043] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Tag size={14} /> {product.itemid}
                  </span>
                </div>
                <h2 className="text-lg font-bold mt-4 text-gray-800">
                  {product.productname}
                </h2>
              </div>
              <button
                onClick={() => openOrderModal(product)}
                className="flex items-center justify-center gap-2 mt-4 bg-[#ff6f00] text-white text-sm py-2 rounded-lg hover:bg-[#e65100] transition-colors duration-200 w-full"
              >
                <ShoppingCart size={16} /> Order Now
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-25 gap-4 items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-2 bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
        >
          <ArrowLeft size={20} /> {/* Left arrow icon */}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <span className="text-xs text-gray-500">
            ({filteredProducts.length} products)
          </span>
        </div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center gap-2 bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
        >
          <ArrowRight size={20} /> {/* Right arrow icon */}
        </button>
      </div>

      {/* Order modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Details
            </h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  value={selectedProduct.productname}
                  readOnly
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  min="1"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Anganwadi Number
                </label>
                <input
                  type="text"
                  value={anganwadiNo}
                  onChange={(e) => setAnganwadiNo(e.target.value)}
                  required
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 mt-4 bg-[#ff6f00] text-white text-sm rounded-lg disabled:bg-gray-300"
              >
                {submitting ? "Submitting..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </WorkerLayout>
  );
};

export default OrderStock;