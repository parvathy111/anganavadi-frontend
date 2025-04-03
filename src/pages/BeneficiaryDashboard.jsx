import { useState } from "react";
import {
  Menu,
  User,
  Package,
  Syringe,
  Calendar,
  MessageSquare,
  Baby,
  LogOut,
  Edit3,
} from "lucide-react";
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";

export default function BeneficiaryDashboard() {
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Child Details",
      description: "View your child's information.",
      icon: <Baby size={32} />,
      
    },
    {
      id: 2,
      title: "Vaccination Records",
      description: "Check your vaccination schedule.",
      icon: <Syringe size={32} />,
    },
    {
      id: 3,
      title: "Event Calendar",
      description: "Stay updated with Anganwadi events.",
      icon: <Calendar size={32} />,
    },
    {
      id: 4,
      title: "Food Distribution",
      description: "Track received food items.",
      icon: <Package size={32} />,
    },
    {
      id: 5,
      title: "Messages",
      description: "Messages from Anganwadi Workers.",
      icon: <MessageSquare size={32} />,
    },
  ];

  return (
    <BeneficiaryLayout>

        {/* Content Area */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#ff7043]">
            Beneficiary Dashboard
          </h3>
          <p className="mt-2 text-gray-600">Your quick actions:</p>

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
        </BeneficiaryLayout>
  );
}
