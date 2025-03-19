import { useState } from "react";
import {
  Menu,
  CalendarCheck,
  Users,
  Package,
  Calendar,
  MessageSquare,
  Syringe,
  LogOut,
  User,
  ChevronDown
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

export default function WorkerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const [beneficiariesDropdown, setBeneficiariesDropdown] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Daily Track",
      description: "Mark attendance and record daily reports.",
      icon: <CalendarCheck size={32} />,
    },
    {
      id: 2,
      title: "View Beneficiaries",
      description: "View Children / Pregnant Women list.",
      icon: <Users size={32} />,
    },
    {
      id: 3,
      title: "Food Distribution",
      description: "Log daily food distribution.",
      icon: <Package size={32} />,
    },
    {
      id: 4,
      title: "Events",
      description: "Manage events for the center.",
      icon: <Calendar size={32} />,
    },
    {
      id: 5,
      title: "Vaccines",
      description: "Track vaccine schedules.",
      icon: <Syringe size={32} />,
    },
    {
      id: 6,
      title: "Messages",
      description: "Communicate with other users.",
      icon: <MessageSquare size={32} />,
    },
  ];

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
                onClick={() => setBeneficiariesDropdown(!beneficiariesDropdown)}
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
                    href="#"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Children List
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[#ff6f00] hover:text-white transition-all duration-200"
                  >
                    Pregnant Women List
                  </a>
                </div>
              )}
            </div>

            {/* Other Links */}
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Package />
              {sidebarOpen && <span>Food Distribution</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Calendar />
              {sidebarOpen && <span>Events</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <Syringe />
              {sidebarOpen && <span>Vaccines</span>}
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
              alt="Worker Dashboard"
              className="rounded-xl w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
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

        {/* Content Area */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#ff7043]">Worker Dashboard</h3>
          <p className="mt-2 text-gray-600">Quick actions:</p>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`rounded-xl p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedCard === index ? "bg-[#f4511e]" : "bg-[#ff7043]"
                } text-white shadow-md`}
                onClick={() => setSelectedCard(index)}
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h4 className="text-lg font-semibold text-center">
                  {card.title}
                </h4>
                <p className="text-sm text-center mt-2">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
