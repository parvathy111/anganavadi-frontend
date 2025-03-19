import { useState } from "react";
import { Menu, LogOut, UserPlus, Eye, ArrowLeft, Home, MapPin, Phone, Mail, Users } from "lucide-react";
import dashboardIcon from "../assets/admin1.png";
import axios from "axios";

export default function AddSupervisor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    localBody: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
    //   const response = await axios.post("http://localhost:5000/supervisor/createsupervisor", formData);
    const response = await axios.post(
        "http://localhost:5000/supervisor/createsupervisor",
        formData,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2RhOTViNjNmNDZjNmIwOGU1MWFmYiIsImlhdCI6MTc0MjM3MTU5NH0.9qnp4PfQcjGEmh5CTAn8Jrm5p3ZKfUbQUIH3Sf-7YHU", // dummy token
          },
        }
      );
      setMessage(response.data.message);
      setFormData({
        fullname: "",
        localBody: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
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
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>
          </div>
          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-8 px-4">
            <a
              href="/admin-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <ArrowLeft />
              {sidebarOpen && <span>Back to Dashboard</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <UserPlus />
              {sidebarOpen && <span>Add Supervisor</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Eye />
              {sidebarOpen && <span>View Supervisor</span>}
            </a>
          </nav>
        </div>

        {/* Bottom Image */}
        <div className="p-4">
          {sidebarOpen && (
            <img
              src={dashboardIcon}
              alt="Bottom Image"
              className="rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add Supervisor</h2>
          <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
            <LogOut className="mr-2" /> Logout
          </button>
        </div>

        {/* Form Section */}
        <div className="p-6 flex justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            {message && (
              <div className="mb-4 text-center text-sm text-red-600">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Local Body */}
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="localBody"
                  placeholder="Local Body"
                  value={formData.localBody}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Gender */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#ff7043] text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Create Supervisor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
