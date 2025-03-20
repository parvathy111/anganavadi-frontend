import React, { useEffect, useState } from "react";
import axios from "axios";
import SupervisorLayout from "../layouts/SupervisorLayout";
import {
  Check,
  X,
  CalendarDays,
  Clock,
  Users,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ApproveEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events/all");
      setEvents(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
      setLoading(false);
    }
  };

  const approveEvent = async (eventId) => {
    try {
      await axios.put(`/api/events/approve/${eventId}`);
      fetchEvents();
    } catch (err) {
      console.error("Error approving event:", err);
    }
  };

  const rejectEvent = async (eventId) => {
    try {
      await axios.put(`/api/events/reject/${eventId}`);
      fetchEvents();
    } catch (err) {
      console.error("Error rejecting event:", err);
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <SupervisorLayout>
      <div className="p-6">
        <h3 className="flex gap-2 text-xl font-semibold text-[#ff7043]">
          <CalendarDays />All Events
        </h3>
        <p className="mt-2 text-gray-600">Below is the list of all Events:</p>

        {events.length === 0 ? (
          <p className="text-gray-500 flex items-center gap-2">
            <XCircle className="text-red-500" /> No events found
          </p>
        ) : (
          <div className="overflow-x-auto mt-5">
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 to-orange-400 text-white">
                  <th className="p-4 text-left">Event Name</th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={16} /> Date
                    </div>
                  </th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      <Clock size={16} /> Time
                    </div>
                  </th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      <Users size={16} /> Participants
                    </div>
                  </th>
                  <th className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      <User size={16} /> Conducted By
                    </div>
                  </th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{event.eventName}</td>
                    <td className="p-4 border-b">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b">{event.time}</td>
                    <td className="p-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.status === "Pending Approval"
                            ? "bg-yellow-400 text-white"
                            : event.status === "Approved"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="p-4 border-b">{event.participantCount}</td>
                    <td className="p-4 border-b">{event.conductedBy}</td>
                    <td className="p-4 border-b">
                      {event.status === "Pending Approval" && (
                        <div className="flex space-x-2">
                          <button
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                            onClick={() => approveEvent(event._id)}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                            onClick={() => rejectEvent(event._id)}
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SupervisorLayout>
  );
};

export default ApproveEvents;
