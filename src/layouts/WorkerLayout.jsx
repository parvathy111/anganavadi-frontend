import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  CalendarCheck,
  Users,
  Package,
  Calendar,
  MessageSquare,
  Syringe,
  LogOut,
  User,
  ChevronDown,
  KeyRound,
  Bell,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";
import { useUser } from "../store/useUser";

function WorkerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [beneficiariesDropdown, setBeneficiariesDropdown] = useState(false);
  const [eventsDropdown, setEventsDropdown] = useState(false);
  const [vaccinesDropdown, setVaccinesDropdown] = useState(false);
  const [foodDropdown, setFoodDropdown] = useState(false);
  const [dailyTrackDropdown, setDailyTrackDropdown] = useState(false);
  const [messageDropdown, setMessageDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUser();

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
            {sidebarOpen && <h1 className="text-xl font-bold">Worker Panel</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white"
            >
              <Menu />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-4 mt-4 px-2">
            {/* Dashboard */}
            <Link
              to="/worker-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <LayoutDashboard />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>

            <div className="border-b border-white border-opacity-30 my-2"></div>

            <Link
              to="/worker-view-anganwadi"
              className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <User />
              {sidebarOpen && <span>Anganawadi Details</span>}
            </Link>

            {/* Daily Track Dropdown */}
            <div>
              <button
                onClick={() => setDailyTrackDropdown(!dailyTrackDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
              >
                <CalendarCheck />
                {sidebarOpen && (
                  <>
                    <span>Daily Track</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        dailyTrackDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {dailyTrackDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/upload-daily-track"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    Upload Daily Activities
                  </Link>
                  <Link
                    to="/worker-view-dailytracks"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    View Activities
                  </Link>
                </div>
              )}
            </div>

            {/* Beneficiaries Dropdown */}
            <div>
              <button
                onClick={() => setBeneficiariesDropdown(!beneficiariesDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2"
              >
                <Users />
                {sidebarOpen && (
                  <>
                    <span>Beneficiaries</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        beneficiariesDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {beneficiariesDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/approve-beneficiaries"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    New Registrations
                  </Link>
                  <Link
                    to="/view-child-parents"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    Children List
                  </Link>
                  <Link
                    to="/view-preg-lact-women"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    Pregnant Women List
                  </Link>
                </div>
              )}
            </div>

            {/* Food Distribution Dropdown */}
            <div>
              <button
                onClick={() => setFoodDropdown(!foodDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2"
              >
                <Package />
                {sidebarOpen && (
                  <>
                    <span>Food Distribution</span>
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
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/order-product"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    Order Stock
                  </Link>
                  <Link
                    to="/view-order"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    My Order
                  </Link>
                  <Link
                    to="/worker-available-stock"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    View Stock
                  </Link>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div>
              <button
                onClick={() => setEventsDropdown(!eventsDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2"
              >
                <Calendar />
                {sidebarOpen && (
                  <>
                    <span>Events</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        eventsDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {eventsDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/add-event"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    New Event
                  </Link>
                  <Link
                    to="/view-events"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    View Event Details
                  </Link>
                </div>
              )}
            </div>

            {/* Vaccines Dropdown */}
            <div>
              <button
                onClick={() => setVaccinesDropdown(!vaccinesDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2"
              >
                <Syringe />
                {sidebarOpen && (
                  <>
                    <span>Vaccines</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        vaccinesDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {vaccinesDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/add-vaccine"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    New Vaccine
                  </Link>
                  <Link
                    to="/view-vaccines"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    View Vaccine Details
                  </Link>
                </div>
              )}
            </div>

            {/* Messages Dropdown */}
            <div>
              <button
                onClick={() => setMessageDropdown(!messageDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2"
              >
                <MessageSquare />
                {sidebarOpen && (
                  <>
                    <span>Messages</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ${
                        messageDropdown ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </>
                )}
              </button>
              {messageDropdown && sidebarOpen && (
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2">
                  <Link
                    to="/worker-send-supervisor"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    To Supervisor
                  </Link>
                  <Link
                    to="/worker-send-beneficiary"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white"
                  >
                    To Beneficiary
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Bottom Image */}
        <div className="p-4">
          {sidebarOpen && (
            <img
              src={dashboardIcon}
              alt="Worker Dashboard"
              className="rounded-xl w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-lg p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome, Worker</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/send-notification")}
              className="relative flex items-center text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <Bell className="mr-2" />
              Notification
            </button>
            
            <button
              onClick={() => navigate("/editprofile/worker")}
              className="flex items-center text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <User className="mr-2" /> Edit Profile
            </button>
            <button
              onClick={() => navigate("/changepassword")}
              className="flex items-center text-[#ff7043] px-3 py-2 rounded-lg hover:opacity-90 transition"
            >
              <KeyRound className="mr-2" /> Change Password
            </button>
            <button
              onClick={logout}
              className="flex items-center text-[#ff7043] px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Children (page content) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default WorkerLayout;
