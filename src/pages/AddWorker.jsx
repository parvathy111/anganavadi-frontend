import React, { useState } from 'react';
import axios from 'axios';
import { Menu, UserPlus, Users, Package, Calendar, MessageSquare, LogOut, User, Home, Phone, Mail, MapPin, CalendarDays, Venus, PlusCircle } from 'lucide-react';

import dashboardIcon from "../assets/admin1.png";
import { useNavigate } from "react-router-dom";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: '',
    anganwadiNo: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
  });

  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/worker/createworker', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage(response.data.message);
      setFormData({
        name: '',
        anganwadiNo: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        dob: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating worker');
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
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white"
            >
              <Menu />
            </button>
          </div>
          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-8 px-4">
            <a
              href="/add-worker"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <UserPlus />
              {sidebarOpen && <span> Add Worker</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Users />
              {sidebarOpen && <span>View Workers</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Package />
              {sidebarOpen && <span>Food Stock</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Calendar />
              {sidebarOpen && <span>Events</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <MessageSquare />
              {sidebarOpen && <span>Messages</span>}
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

        {/* Add Worker Form */}
        <div className="p-8">
          {message && <p className="mb-4 text-red-500">{message}</p>}
         

<form 
  onSubmit={handleSubmit} 
  className="space-y-6 max-w-xl mx-auto bg-white shadow-xl p-8 rounded-2xl"
>
<h3 className="text-xl font-semibold text-[#ff7043] mb-4">Add Worker</h3>
  <div className="flex items-center border rounded p-2 space-x-2">
    <User className="text-gray-500" />
    <input
      type="text"
      name="name"
      placeholder="Worker Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full outline-none"
      required
    />
  </div>

  <div className="flex space-x-4">

  <div className="flex items-center border rounded p-4 space-x-2">
    <Home className="text-gray-500" />
    <input
      type="text"
      name="anganwadiNo"
      placeholder="Anganwadi No"
      value={formData.anganwadiNo}
      onChange={handleChange}
      className="w-full outline-none"
      required
    />
  </div>

  <div className="flex items-center border rounded p-4 space-x-2">
    <Phone className="text-gray-500" />
    <input
      type="text"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      className="w-full outline-none"
      required
    />
  </div>

  </div>

  <div className="flex items-center border rounded p-2 space-x-2">
    <Mail className="text-gray-500" />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="w-full outline-none"
      required
    />
  </div>

  <div className="flex items-start border rounded p-2 space-x-2">
    <MapPin className="text-gray-500 mt-1" />
    <textarea
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      className="w-full outline-none resize-none"
      required
    ></textarea>
  </div>

  <div className="flex items-center border rounded p-2 space-x-2">
    <Venus className="text-gray-500" />
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="w-full outline-none"
      required
    >
      <option value="">Select Gender</option>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div className="flex items-center border rounded p-2 space-x-2">
    <CalendarDays className="text-gray-500" />
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="w-full outline-none"
      required
    />
  </div>

  <button 
    type="submit" 
    className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-xl hover:opacity-90 transition"
  >
    <PlusCircle className="mr-2" /> Create Worker
  </button>
</form>

        </div>
      </div>
    </div>
  );
};

export default AddWorker;
