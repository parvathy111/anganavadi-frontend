import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerLayout from "../layouts/WorkerLayout";
import { ShoppingCart, PackageCheck, Tag, Search, X } from "lucide-react";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/all");
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

      const res = await axios.post("http://localhost:5000/orders/create", payload);

      if (res.status === 201) {
        setNotification({ type: "success", message: res.data.message || "Order placed successfully!" });
        closeModal();
      } else {
        setNotification({ type: "error", message: "Something went wrong. Please try again!" });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to place the order.";
      setNotification({ type: "error", message: errorMsg });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <WorkerLayout>
      {notification && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="text-center mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 mt-5 flex justify-center items-center gap-2">
          <PackageCheck className="text-[#ff6f00]" size={30} />
          Available Stock
        </h1>
        <p className="text-gray-500 mb-4">
          Browse and order stock for your center
        </p>
      </div>

      <div className="flex justify-center mb-6 px-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 shadow-sm bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Product ID
                </label>
                <input
                  type="text"
                  value={selectedProduct.itemid}
                  readOnly
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 shadow-sm bg-gray-100"
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
                  required
                  min="1"
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 shadow-sm"
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
                  className="w-full mt-1 p-2 rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full flex items-center justify-center gap-2 mt-2 ${
                  submitting ? "bg-gray-400" : "bg-[#ff6f00] hover:bg-[#e65100]"
                } text-white py-2 rounded-lg transition-colors duration-200`}
              >
                {submitting ? "Placing Order..." : "Submit Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </WorkerLayout>
  );
};

export default OrderStock;
