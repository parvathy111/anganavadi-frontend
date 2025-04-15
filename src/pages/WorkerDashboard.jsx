import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  Users,
  Package,
  Calendar,
  MessageSquare,
  Syringe,
  Home,
} from "lucide-react";

import WorkerLayout from "../layouts/WorkerLayout";

export default function WorkerDashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Daily Track",
      description: "Mark attendance and record reports.",
      icon: <CalendarCheck size={32} />,
      link: "/daily-track",
    },
    {
      id: 2,
      title: "View Children",
      description: "View Children who are students.",
      icon: <Users size={32} />,
      link: "/view-child-parents",
    },
    {
      id: 3,
      title: "View other beneficiaries",
      description: "View Lactating / Pregnant Women.",
      icon: <Users size={32} />,
      link: "/view-preg-lact-women",
    },
    {
      id: 4,
      title: "Food Distribution",
      description: "Log daily food distribution.",
      icon: <Package size={32} />,
      link: "/food-distribution",
    },
    {
      id: 5,
      title: "Events",
      description: "Manage events for the center.",
      icon: <Calendar size={32} />,
      link: "/view-events",
    },
    {
      id: 6,
      title: "Vaccines",
      description: "Track vaccine schedules.",
      icon: <Syringe size={32} />,
      link: "/view-vaccines",
    },
    {
      id: 7,
      title: "Messages",
      description: "Communicate with other users.",
      icon: <MessageSquare size={32} />,
      link: "/messages",
    },
    {
      id: 8,
      title: "Anganawadi Details",
      description: "Your Anganawadi Center.",
      icon: <Home size={32} />,
      link: "/messages",
    },
  ];

  return (
    <WorkerLayout>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#ff7043]">
          Worker Dashboard
        </h3>
        <p className="mt-2 text-gray-600">Quick actions:</p>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link key={card.id} to={card.link}>
              <div
                className={`rounded-xl p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedCard === card.id ? "bg-[#f4511e]" : "bg-[#ff7043]"
                } text-white shadow-md`}
                onClick={() => setSelectedCard(card.id)}
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h4 className="text-lg font-semibold text-center">
                  {card.title}
                </h4>
                <p className="text-sm text-center mt-2">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </WorkerLayout>
  );
}
