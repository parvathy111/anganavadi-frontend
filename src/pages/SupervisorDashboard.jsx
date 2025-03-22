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
import SupervisorLayout from "../layouts/SupervisorLayout";

export default function SupervisorDashboard() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(0);

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
      link: "/view-workers",
    },
    {
      id: 3,
      title: "Food Stock",
      description: "Manage the food stock inventory.",
      icon: <Package size={32} />,
      link: "/add-product",
    },
    {
      id: 4,
      title: "Events",
      description: "Manage and schedule events.",
      icon: <Calendar size={32} />,
      link: "/approve-events",
    },
    {
      id: 5,
      title: "Messages",
      description: "Send and view messages.",
      icon: <MessageSquare size={32} />,
      link: "#",
    },
  ];

  return (
    <SupervisorLayout>
      <h3 className="text-xl font-semibold text-[#ff7043]">
        Supervisor Dashboard
      </h3>
      <p className="mt-2 text-gray-600">Choose an action below:</p>

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
    </SupervisorLayout>
  );
}
