import { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu, ArrowLeft, Users, Eye, Phone, Mail, Home, MapPin, User, Trash2,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

export default function ViewSupervisorsList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [supervisors, setSupervisors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/supervisor/viewsupervisors");
      setSupervisors(response.data.supervisors || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load supervisors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supervisor?")) return;

    try {
      await axios.delete(`http://localhost:5000/supervisor/delete/${id}`);
      setSupervisors((prev) => prev.filter((sup) => sup._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete supervisor");
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
          <div className="flex items-center justify-between p-4">
            {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 mt-8 px-4">
            <a
              href="/admin-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <ArrowLeft />
              {sidebarOpen && <span>Back to Dashboard</span>}
            </a>
            <a
              href="/add-supervisor"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Users />
              {sidebarOpen && <span>Add Supervisor</span>}
            </a>
            <a
              href="/view-supervisors"
              className="flex items-center space-x-2 bg-[#ff6f00cc] bg-opacity-30 rounded p-2 transition-colors duration-300"
            >
              <Eye />
              {sidebarOpen && <span>View Supervisors</span>}
            </a>
          </nav>
        </div>
        <div className="p-4">
          {sidebarOpen && (
            <img src={dashboardIcon} alt="Bottom Image" className="rounded-xl" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Supervisors List</h2>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading supervisors...</p>
          ) : message ? (
            <div className="mb-4 text-center text-red-600">{message}</div>
          ) : supervisors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 bg-orange-500 text-white">
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left"><User className="inline-block mr-1" size={16} /> Name</th>
                    <th className="py-3 px-4 text-left"><MapPin className="inline-block mr-1" size={16} /> Local Body</th>
                    <th className="py-3 px-4 text-left"><Home className="inline-block mr-1" size={16} /> Address</th>
                    <th className="py-3 px-4 text-left"><Phone className="inline-block mr-1" size={16} /> Phone</th>
                    <th className="py-3 px-4 text-left"><Mail className="inline-block mr-1" size={16} /> Email</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((sup, index) => (
                    <tr key={sup._id} className="hover:bg-orange-50">
                      <td className="py-2 px-4 font-semibold">{index + 1}</td>
                      <td className="py-2 px-4">{sup.fullname}</td>
                      <td className="py-2 px-4">{sup.localBody}</td>
                      <td className="py-2 px-4">{sup.address}</td>
                      <td className="py-2 px-4">{sup.phone}</td>
                      <td className="py-2 px-4">{sup.email}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDelete(sup._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Supervisor"
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
            <p className="text-center text-gray-600">No supervisors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
