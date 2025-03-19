import { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu, UserPlus, Users, Package, Calendar, MessageSquare, User, LogOut, Phone, Mail, Home, MapPin, CalendarDays, Trash2
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

export default function ViewWorkerList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/worker/allworkers");
      setWorkers(response.data || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      await axios.delete(`http://localhost:5000/worker/delete/${id}`);
      setWorkers((prev) => prev.filter((worker) => worker._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete worker");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`text-white flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
        style={{
          background: "linear-gradient(135deg, #ff9800 0%, #f48fb1 100%)",
        }}
      >
        <div>
          {/* Sidebar Toggle */}
          <div className="flex items-center justify-between p-4">
            {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
              <Menu />
            </button>
          </div>
          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-8 px-4">
            <a href="/supervisor/add-worker" className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2">
              <UserPlus />
              {sidebarOpen && <span>Add Worker</span>}
            </a>
            <a href="/supervisor/view-workers" className="flex items-center space-x-2 bg-[#ff6f00cc] bg-opacity-20 rounded p-2">
              <Users />
              {sidebarOpen && <span>View Workers</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2">
              <Package />
              {sidebarOpen && <span>Food Stock</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2">
              <Calendar />
              {sidebarOpen && <span>Events</span>}
            </a>
            <a href="#" className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2">
              <MessageSquare />
              {sidebarOpen && <span>Messages</span>}
            </a>
          </nav>
        </div>
        {/* Bottom Image */}
        <div className="p-4">
          {sidebarOpen && (
            <img src={dashboardIcon} alt="Bottom Image" className="rounded-xl" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar (SAME AS DASHBOARD) */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, Supervisor</h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
              <User className="mr-2" /> Edit Profile
            </button>
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Workers Table */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#ff7043]">All Workers</h3>
          <p className="mt-2 text-gray-600">Below is the list of all Anganwadi workers:</p>
          {loading ? (
            <p className="text-center text-gray-600 mt-4">Loading workers...</p>
          ) : message ? (
            <div className="mb-4 text-center text-red-600 mt-4">{message}</div>
          ) : workers.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 bg-orange-500 text-white">
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left"><User className="inline-block mr-1" size={16} /> Name</th>
                    <th className="py-3 px-4 text-left"><Mail className="inline-block mr-1" size={16} /> Email</th>
                    <th className="py-3 px-4 text-left"><Phone className="inline-block mr-1" size={16} /> Phone</th>
                    <th className="py-3 px-4 text-left"><MapPin className="inline-block mr-1" size={16} /> Anganwadi No</th>
                    <th className="py-3 px-4 text-left"><User className="inline-block mr-1" size={16} /> Gender</th>
                    <th className="py-3 px-4 text-left"><CalendarDays className="inline-block mr-1" size={16} /> DOB</th>
                    <th className="py-3 px-4 text-left"><Home className="inline-block mr-1" size={16} /> Address</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker, index) => (
                    <tr key={worker._id} className="hover:bg-orange-50">
                      <td className="py-2 px-4 font-semibold">{index + 1}</td>
                      <td className="py-2 px-4">{worker.name}</td>
                      <td className="py-2 px-4">{worker.email}</td>
                      <td className="py-2 px-4">{worker.phone}</td>
                      <td className="py-2 px-4">{worker.anganwadiNo}</td>
                      <td className="py-2 px-4 capitalize">{worker.gender}</td>
                      <td className="py-2 px-4">{new Date(worker.dob).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{worker.address}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDelete(worker._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Worker"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">No workers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
