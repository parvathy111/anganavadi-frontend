import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Event,
  Search,
  CalendarToday,
  AccessTime,
  Group,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/all"); // Adjust URL as per backend
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.eventName?.toLowerCase().includes(lowercasedQuery) ||
        (Array.isArray(event.participants) &&
          event.participants.some((participant) =>
            participant?.toLowerCase().includes(lowercasedQuery)
          ))
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white";
      case "upcoming":
        return "bg-blue-500 text-white";
      case "canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        className="text-center font-bold mb-6 text-black flex items-center justify-center"
      >
        <Event className="mr-2" /> Event List
      </Typography>

      <div className="mb-4 flex justify-center p-8">
        <TextField
          label="Search by Event Name or Participant"
          variant="outlined"
          fullWidth
          className="max-w-lg bg-white rounded"
          InputProps={{
            startAdornment: <Search className="mr-2 text-gray-500" />,
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-white">Loading events...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-bold">#</TableCell>
                <TableCell className="font-bold">Event Name</TableCell>
                <TableCell className="font-bold">
                  <Group className="mr-1" />
                  Participants
                </TableCell>
                <TableCell className="font-bold">Organisers</TableCell>
                <TableCell className="font-bold flex items-center">
                  <CalendarToday className="mr-1" /> Date
                </TableCell>
                <TableCell className="font-bold flex items-center">
                  <AccessTime className="mr-1" /> Time
                </TableCell>
                <TableCell className="font-bold">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <TableRow key={event._id} className="text-center">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>
                      {Array.isArray(event.participants)
                        ? event.participants.join(", ")
                        : "N/A"}
                    </TableCell>
                    <TableCell>{event.conductedBy}</TableCell>
                    <TableCell>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{event.time || "N/A"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-lg flex items-center ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status === "completed" ? (
                          <CheckCircle className="mr-1" />
                        ) : (
                          <Cancel className="mr-1" />
                        )}
                        {event.status || "Unknown"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center p-4">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewEvents;