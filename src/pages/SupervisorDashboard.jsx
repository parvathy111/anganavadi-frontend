import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  UserPlus,
  Edit,
  Eye,
  LogOut,
  User,
  Users,
  Package,
  Calendar,
  MessageSquare,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);

  const solidColor = "#ff7043"; // solid orange

  const cards = [
    {
      id: 1,
      title: "Add Worker",
      description: "Add a new Anganwadi worker.",
      icon: <UserPlus size={32} />,
      link: "/add-worker",
    },
    {
      id: 2,
      title: "View Workers",
      description: "View all workers in the system.",
      icon: <Users size={32} />,
    },
    {
      id: 3,
      title: "Food Stock",
      description: "Manage the food stock inventory.",
      icon: <Package size={32} />,
    },
    {
      id: 4,
      title: "Events",
      description: "Manage and schedule events.",
      icon: <Calendar size={32} />,
    },
    {
      id: 5,
      title: "Messages",
      description: "Send and view messages.",
      icon: <MessageSquare size={32} />,
    },
  ];

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
              href="/view-workers"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Users />
              {sidebarOpen && <span>View Workers</span>}
            </a>
            <a
              href="/add-product"
              className="flex items-center space-x-2 hover:bg-[#ff6f00cc] hover:bg-opacity-20 rounded p-2"
            >
              <Package />
              {sidebarOpen && <span>Food Stock</span>}
            </a>
            <a
              href="/approve-events"
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
            {/* Profile Icon */}
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
          <h3 className="text-xl font-semibold text-[#ff7043]">
            Supervisor Dashboard
          </h3>
          <p className="mt-2 text-gray-600">Choose an action below:</p>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => {
                  setSelectedCard(index);
                  navigate(card.link);
                }}
                className={`rounded-xl p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedCard === index ? "bg-[#f4511e]" : "bg-[#ff7043]"
                } text-white shadow-md`}
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
