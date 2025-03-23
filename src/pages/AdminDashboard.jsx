import { useState } from "react";
import { UserPlus, Edit } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Add Supervisor",
      description: "Create a new supervisor profile.",
      icon: <UserPlus size={32} />,
      link: "/add-supervisor",
    },
    {
      id: 2,
      title: "Update Supervisor",
      description: "Update the supervisor list.",
      icon: <Edit size={32} />,
      link: "/view-supervisors",
    },
  ];

  const handleCardClick = (index, link) => {
    setSelectedCard(index);
    navigate(link);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#ff7043]">
          Admin Dashboard
        </h3>
        <p className="mt-2 text-gray-600">Choose an action below:</p>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`rounded-xl p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                selectedCard === index ? "bg-[#f4511e]" : "bg-[#ff7043]"
              } text-white shadow-md`}
              onClick={() => handleCardClick(index, card.link)}
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
    </AdminLayout>
  );
}
