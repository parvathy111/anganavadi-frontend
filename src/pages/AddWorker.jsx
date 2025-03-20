import React, { useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  User,
  Home,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Venus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SupervisorLayout from "../layouts/SupervisorLayout";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: "",
    anganwadiNo: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/worker/createworker",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setIsError(false);
      setFormData({
        name: "",
        anganwadiNo: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        dob: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating worker");
      setIsError(true);
    }
  };

  return (
    <SupervisorLayout>
      <div className="p-8">
        {message && (
          <p
            className={`mb-4 ${
              isError ? "text-red-500" : "text-green-600"
            } font-medium text-center`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-xl mx-auto bg-white shadow-2xl p-8 rounded-2xl"
        >
          <h3 className="text-3xl font-bold text-center text-gradient mb-6 bg-gradient-to-r from-orange-500 to-orange-500 text-transparent bg-clip-text">
            Add Worker
          </h3>

          {/* Name */}
          <div className="flex items-center border rounded-lg p-3 space-x-3 hover:shadow-md transition">
            <User className="text-orange-500" />
            <input
              type="text"
              name="name"
              placeholder="Worker Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded"
              required
            />
          </div>

          {/* Anganwadi No & Phone */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex items-center border rounded-lg p-3 space-x-3 w-full hover:shadow-md transition">
              <Home className="text-orange-500" />
              <input
                type="text"
                name="anganwadiNo"
                placeholder="Anganwadi No"
                value={formData.anganwadiNo}
                onChange={handleChange}
                className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded"
                required
              />
            </div>

            <div className="flex items-center border rounded-lg p-3 space-x-3 w-full hover:shadow-md transition">
              <Phone className="text-orange-500" />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg p-3 space-x-3 hover:shadow-md transition">
            <Mail className="text-orange-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-start border rounded-lg p-3 space-x-3 hover:shadow-md transition">
            <MapPin className="text-orange-500 mt-1" />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full outline-none resize-none focus:ring-2 focus:ring-orange-400 rounded"
              rows={2}
              required
            ></textarea>
          </div>

          {/* Gender & DOB */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center border rounded-lg p-3 space-x-3 w-full hover:shadow-md transition">
              <Venus className="text-orange-500" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 focus:ring-2 focus:ring-orange-400 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 space-x-3 w-full hover:shadow-md transition">
              <CalendarDays className="text-orange-500" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 focus:ring-2 focus:ring-orange-400 rounded"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:scale-[1.02] transition-transform font-semibold gap-2"
          >
            <PlusCircle /> Create Worker
          </button>
        </form>
      </div>
    </SupervisorLayout>
  );
};

export default AddWorker;
