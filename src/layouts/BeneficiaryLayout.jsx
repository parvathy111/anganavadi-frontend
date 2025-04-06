import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; 
import {
  Menu,
  User,
  Package,
  Syringe,
  Calendar,
  MessageSquare,
  Baby,
  LogOut,
  Edit3,
  LayoutDashboard ,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";
import { useUser } from "../store/useUser";

const BeneficiaryLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const { logout } = useUser()

  return (
    <div className="flex h-screen overflow-hidden">
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
            {sidebarOpen && <h1 className="text-xl font-bold">Beneficiary</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white"
            >
              <Menu />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-8 px-2">
             {/* Dashboard */}
             <a
              href="/beneficiary-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <LayoutDashboard />
              {sidebarOpen && <span>Dashboard</span>}
            </a>

            <div className="border-b border-white border-opacity-30 my-2"></div>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <User />
              {sidebarOpen && <span>My Profile</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Package />
              {sidebarOpen && <span>Food Distribution</span>}
            </a>
            <a
              href="/beneficiary-view-vaccines"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Syringe />
              {sidebarOpen && <span>Vaccination Records</span>}
            </a>
            <a
              href="/beneficiary-view-events"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Calendar />
              {sidebarOpen && <span>Event Calendar</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Baby />
              {sidebarOpen && <span>Child Details</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
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
              alt="Beneficiary Dashboard"
              className="rounded-xl w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome, Beneficiary</h2>
          <div className="flex items-center space-x-1">
            <button  onClick={() => navigate("/edit-beneficiary-Profile/parent")}
            className="flex items-center  text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition ">
              <Edit3 className="mr-2" /> Edit Profile
            </button>
            <button onClick={ logout }
            className="flex items-center  text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition ">
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default BeneficiaryLayout;
