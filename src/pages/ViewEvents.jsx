import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CalendarToday } from "@mui/icons-material";
import {
  Users,
  User,
  CalendarDays,
  Clock,
  BadgeCheck,
} from "lucide-react";
import WorkerLayout from "../layouts/WorkerLayout";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    Object.values(event).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 font-semibold";
      case "upcoming":
        return "text-blue-600 font-semibold";
      case "canceled":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <WorkerLayout>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Header */}
          <Box display="flex" mt={5} alignItems="center" justifyContent="center" mb={3}>
            <CalendarToday sx={{ color: "#ff7043" }} />
            <Typography variant="h4" ml={1} fontWeight="bold" sx={{ color: "#ff7043" }}>
              Event List
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box display="flex" justifyContent="center" mb={4}>
            <TextField
              label="Search Event or Participant"
              variant="outlined"
              sx={{ width: "400px" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Event Table */}
          {filteredEvents.length > 0 ? (
            <div className="mt-6 overflow-x-auto px-6 pb-6">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                    <th className="py-3 px-4 text-left">
                       #
                    </th>
                    <th className="py-3 px-4 text-left">
                      <CalendarDays className="inline-block mr-1" size={16} /> Event Name
                    </th>
                    <th className="py-3 px-4 text-left">
                      <Users className="inline-block mr-1" size={16} /> Participants
                    </th>
                    <th className="py-3 px-4 text-left">
                      <User className="inline-block mr-1" size={16} /> Organisers
                    </th>
                    <th className="py-3 px-4 text-left">
                      <CalendarDays className="inline-block mr-1" size={16} /> Date
                    </th>
                    <th className="py-3 px-4 text-left">
                      <Clock className="inline-block mr-1" size={16} /> Time
                    </th>
                    <th className="py-3 px-4 text-left">
                      <BadgeCheck className="inline-block mr-1" size={16} /> Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, index) => (
                    <tr key={event._id} className="hover:bg-blue-50">
                      <td className="py-2 px-4 font-semibold">{index + 1}</td>
                      <td className="py-2 px-4">{event.eventName || "N/A"}</td>
                      <td className="py-2 px-4">
                        {Array.isArray(event.participants)
                          ? event.participants.join(", ")
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4">{event.conductedBy || "N/A"}</td>
                      <td className="py-2 px-4">
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4">{event.time || "N/A"}</td>
                      <td className={`py-2 px-4 ${getStatusColor(event.status)}`}>
                        {event.status || "Unknown"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
            >
              No events found.
            </Typography>
          )}
        </Box>
      )}
    </WorkerLayout>
  );
};

export default ViewEvents;
