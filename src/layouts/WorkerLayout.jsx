import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

function WorkerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [beneficiariesDropdown, setBeneficiariesDropdown] = useState(false);
  const [eventsDropdown, setEventsDropdown] = useState(false);
  const [vaccinesDropdown, setVaccinesDropdown] = useState(false);

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
          <nav className="flex flex-col space-y-4 mt-8 px-2">
            {/* Back to Dashboard */}
            <a
              href="/worker-dashboard"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <LayoutDashboard />
              {sidebarOpen && <span>Dashboard</span>}
            </a>

            <div className="border-b border-white border-opacity-30 my-2"></div>

            {/* Daily Track */}
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <CalendarCheck />
              {sidebarOpen && <span>Daily Track</span>}
            </a>

            {/* Beneficiaries Dropdown */}
            <div>
              <button
                onClick={() =>
                  setBeneficiariesDropdown(!beneficiariesDropdown)
                }
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
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
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/approve-beneficiaries"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    New Registrations
                  </a>
                  <a
                    href="view-child-parents"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Children List
                  </a>
                  <a
                    href="/view-preg-lact-women"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Pregnant Women List
                  </a>
                </div>
              )}
            </div>

            {/* Food Distribution Link */}
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Package />
              {sidebarOpen && <span>Food Distribution</span>}
            </a>

            {/* Events Dropdown */}
            <div>
              <button
                onClick={() => setEventsDropdown(!eventsDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
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
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/add-event"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    New Event
                  </a>
                  <a
                    href="/view-events"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    View Event Details
                  </a>
                </div>
              )}
            </div>

            {/* Vaccines Dropdown */}
            <div>
              <button
                onClick={() => setVaccinesDropdown(!vaccinesDropdown)}
                className="flex items-center space-x-2 w-full hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
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
                <div className="ml-6 mt-2 bg-[#ffffff22] rounded-xl shadow-md p-2 space-y-2 transition-all duration-300">
                  <a
                    href="/add-vaccine"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    New Vaccine
                  </a>
                  <a
                    href="/view-vaccines"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    View Vaccine Details
                  </a>
                </div>
              )}
            </div>

            {/* Messages Link */}
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
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
              <User className="mr-2" /> Edit Profile
            </button>
            <button className="flex items-center bg-[#ff7043] text-[#fafafa] px-4 py-2 rounded-lg hover:opacity-90 transition border border-[#ff7043]">
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
