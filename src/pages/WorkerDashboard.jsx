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
  ChevronDown,
} from "lucide-react";
import dashboardIcon from "../assets/admin1.png";
import WorkerLayout from "../layouts/WorkerLayout";

export default function WorkerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const [beneficiariesDropdown, setBeneficiariesDropdown] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Daily Track",
      description: "Mark attendance and record reports.",
      icon: <CalendarCheck size={32} />,
    },
    {
      id: 2,
      title: "View Children",
      description: "View Children who are students.",
      icon: <Users size={32} />,
    },
    {
      id: 3,
      title: "View other beneficiaries",
      description: "View Lactating / Pregnant Women.",
      icon: <Users size={32} />,
    },
    {
      id: 4,
      title: "Food Distribution",
      description: "Log daily food distribution.",
      icon: <Package size={32} />,
    },
    {
      id: 5,
      title: "Events",
      description: "Manage events for the center.",
      icon: <Calendar size={32} />,
    },
    {
      id: 6,
      title: "Vaccines",
      description: "Track vaccine schedules.",
      icon: <Syringe size={32} />,
    },
    {
      id: 7,
      title: "Messages",
      description: "Communicate with other users.",
      icon: <MessageSquare size={32} />,
    },
  ];

  return (
    <WorkerLayout>
      
        {/* Content Area */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#ff7043]">
            Worker Dashboard
          </h3>
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
    </WorkerLayout>
  );
}
