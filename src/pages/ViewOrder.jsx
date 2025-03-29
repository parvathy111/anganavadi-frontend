import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerLayout from "../layouts/WorkerLayout";
import {
  Search,
  Tag,
  Pencil,
  PackageCheck,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [newAnganwadiNo, setNewAnganwadiNo] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // success / error
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;  // Number of orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter(
      (order) =>
        order.productname.toLowerCase().includes(query) ||
        order.itemid.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Total pages
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setNewQuantity(order.quantity);
    setNewAnganwadiNo(order.anganwadiNo);
    setNewProductName(order.productname);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setNewQuantity("");
    setNewAnganwadiNo("");
    setNewProductName("");
    setUpdating(false);
    setMessage(null);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    try {
      await axios.put(
        `http://localhost:5000/orders/update/${selectedOrder._id}`,
        {
          quantity: newQuantity,
          anganwadiNo: newAnganwadiNo,
          productname: newProductName,
        }
      );

      const updatedOrders = orders.map((o) =>
        o._id === selectedOrder._id
          ? {
              ...o,
              quantity: newQuantity,
              anganwadiNo: newAnganwadiNo,
              productname: newProductName,
            }
          : o
      );

      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setMessage("Order updated successfully!");
      setMessageType("success");
      setUpdating(false);
      setTimeout(closeModal, 1500);
    } catch (error) {
      console.error("Error updating order:", error);
      const backendMessage =
        error.response?.data?.message ||
        "Failed to update order. Please try again.";
      setMessage(backendMessage);
      setMessageType("error");
      setUpdating(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:5000/orders/cancel/${orderId}`);
      const updatedOrders = orders.filter((o) => o._id !== orderId);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      alert("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading Orders...</div>;

  return (
    <WorkerLayout>
      <div className="flex flex-col gap-4">
        {/* Header and Search bar in the same row */}
        <div className="flex justify-between items-center mb-4 px-4">
          {/* Header */}
          <div>
            <h1 className="flex items-left gap-2 text-3xl font-extrabold text-gray-800 mb-3 mt-5">
              <PackageCheck size={28} className="text-[#ff6f00]" />
              All Stock Orders
            </h1>
            <p className="text-gray-500 mb-4">Manage and update your placed orders</p>
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
        
        {/* Order cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-2">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="relative">
                    <img
                      src={order.image}
                      alt={order.productname}
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#ff7043] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Tag size={14} /> {order.itemid}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mt-4 text-gray-800">
                    {order.productname}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantity: {order.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Anganwadi No: {order.anganwadiNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {order.orderStatus}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openUpdateModal(order)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#ff6f00] text-white text-sm py-2 rounded-lg hover:bg-[#e65100] transition-colors duration-200"
                  >
                    <Pencil size={16} /> Update
                  </button>
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white text-sm py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={16} /> Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-4 items-center">
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
            <span className="text-xs text-gray-500">({filteredOrders.length} orders)</span>
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center gap-2 bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Mobile responsiveness */}
        <div className="lg:hidden flex flex-col items-center gap-4 mt-6">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[#ff6f00] text-white py-2 px-4 rounded-lg hover:bg-[#e65100] disabled:bg-gray-300 transition-all duration-200"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

       
        {/* Update Order Modal */}
{selectedOrder && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
      {/* Modal Header */}
      <div className="border-b px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-800">Update Order Details</h3>
      </div>
      
      {/* Modal Body */}
      <div className="p-6">
        {message && (
          <div className={`mb-4 p-3 rounded-md ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleUpdateOrder}>
          <div className="space-y-4">
            {/* Product Name Field */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f00] focus:outline-none"
                required
              />
            </div>
            
            {/* Quantity Field */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f00] focus:outline-none"
                required
                min="1"
              />
            </div>
            
            {/* Anganwadi Number Field */}
            <div>
              <label htmlFor="anganwadiNo" className="block text-sm font-medium text-gray-700 mb-1">
                Anganwadi Number
              </label>
              <input
                type="text"
                id="anganwadiNo"
                value={newAnganwadiNo}
                onChange={(e) => setNewAnganwadiNo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f00] focus:outline-none"
                required
              />
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#ff6f00] rounded-lg hover:bg-[#e65100] focus:outline-none focus:ring-2 focus:ring-[#ff6f00] disabled:opacity-50"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
      </div>
    </WorkerLayout>
  );
};

export default ViewOrder;