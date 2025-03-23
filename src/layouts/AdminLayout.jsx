import { useState } from "react";
import {
  Menu,
  UserPlus,
  Eye,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white"
            >
              <Menu />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-8 px-4">
            {/* Dashboard */}
            <a
              href="/admin-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <LayoutDashboard />
              {sidebarOpen && <span>Dashboard</span>}
            </a>

            <div className="border-b border-white border-opacity-30 my-2"></div>

            {/* Add Supervisor */}
            <a
              href="/add-supervisor"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <UserPlus />
              {sidebarOpen && <span>Add Supervisor</span>}
            </a>

            {/* View Supervisors */}
            <a
              href="/view-supervisors"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Eye />
              {sidebarOpen && <span>View Supervisors</span>}
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
        {/* Top Navbar */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, Admin</h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
              <User className="mr-2" /> Edit Profile
            </button>
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Inject page content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
