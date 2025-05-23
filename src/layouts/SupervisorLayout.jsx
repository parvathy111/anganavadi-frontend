import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  UserPlus,
  Users,
  Package,
  Calendar,
  MessageSquare,
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
  Home,
  KeyRound,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";
import { useUser } from "../store/useUser";

const SupervisorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [foodDropdown, setFoodDropdown] = useState(false);
  const [anganwadiDropdown, setAnganwadiDropdown] = useState(false);
  const [workerDropdown, setWorkerDropdown] = useState(false); // ✅ Added this line
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
            {sidebarOpen && <h1 className="text-xl font-bold">Supervisor</h1>}
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
              href="/supervisor-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <LayoutDashboard />
              {sidebarOpen && <span>Dashboard</span>}
            </a>

            <div className="border-b border-white border-opacity-30 my-2"></div>

            {/* Manage Anganwadi Dropdown */}
            <div>
              <button
                onClick={() => setAnganwadiDropdown(!anganwadiDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2 transition-all duration-200"
              >
                <Home />
                {sidebarOpen && (
                  <>
                    <span>Manage Anganwadi</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        anganwadiDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {anganwadiDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/addanganawadi"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Add Anganwadi
                  </a>
                  <a
                    href="/view-anganawadis"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    View Anganwadi
                  </a>
                </div>
              )}
            </div>

            {/* Manage Worker Dropdown */}
            <div>
              <button
                onClick={() => setWorkerDropdown(!workerDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2 transition-all duration-200"
              >
                <Users />
                {sidebarOpen && (
                  <>
                    <span>Manage Worker</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        workerDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>

              {workerDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/add-worker"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Add Worker
                  </a>
                  <a
                    href="/view-workers"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    View Workers
                  </a>
                </div>
              )}
            </div>

            {/* Food Stock Dropdown */}
            <div>
              <button
                onClick={() => setFoodDropdown(!foodDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2 transition-all duration-200"
              >
                <Package />
                {sidebarOpen && (
                  <>
                    <span>Food Stock</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        foodDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {foodDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/add-product"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Add New Stock
                  </a>
                  <a
                    href="/supervisor-orders"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    New Orders
                  </a>
                  <a
                    href="/supervisor-products"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    View Stock
                  </a>
                </div>
              )}
            </div>

            {/* Events */}
            <a
              href="/approve-events"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Calendar />
              {sidebarOpen && <span>Events</span>}
            </a>

            {/* Messages */}
            <a
              href="/send-message"
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, Supervisor</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigate("/edit-profile/supervisor")}
              className="flex items-center text-[#ff7043] px-3 py-2 rounded-lg hover:opacity-90 transition"
            >
              <User className="mr-2" /> Edit Profile
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="flex items-center text-[#ff7043] px-3 py-2 rounded-lg hover:opacity-90 transition"
            >
              <KeyRound className="mr-2" /> Change Password
            </button>
            <button onClick={ logout }
            className="flex items-center text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition">
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

export default SupervisorLayout;
