import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import SupervisorLayout from "../layouts/SupervisorLayout";

const SupervisorViewOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders/all")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleApprove = (orderId) => {
    fetch(`http://localhost:5000/orders/approve/${orderId}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: "Approved" } : order
          )
        );
      });
  };

  const handleReject = (orderId) => {
    fetch(`http://localhost:5000/orders/cancel/${orderId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      });
  };

  return (
    <SupervisorLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#ff9800] text-white">
            <tr>
              <th className="p-3 text-left">Item ID</th>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Anganwadi No</th>
              <th className="p-3 text-left">Order Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-orange-50 transition duration-150"
              >
                <td className="p-3">{order.itemid}</td>
                <td className="p-3">{order.productname}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">{order.anganwadiNo}</td>
                <td className="p-3">
                  {new Date(order.orderDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3 font-semibold">{order.orderStatus}</td>
                <td className="p-3 flex justify-center gap-3">
                  {order.orderStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:opacity-90"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:opacity-90"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  )}
                  {order.orderStatus === "Approved" && (
                    <button
                      onClick={() => handleReject(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:opacity-90"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SupervisorLayout>
  );
};

export default SupervisorViewOrder;
