
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// const ViewEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/events"); // Adjust URL as per backend
//         setEvents(response.data);
//         console.log(response);
//       } catch (err) {
//         setError("Failed to fetch events. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Event List</h2>

//       {loading ? (
//         <p className="text-center">Loading events...</p>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <TableContainer component={Paper} className="shadow-lg">
//           <Table>
//             <TableHead className="bg-gray-200">
//               <TableRow>
//                 <TableCell className="font-bold">#</TableCell>
//                 <TableCell className="font-bold">Event Name</TableCell>
//                 <TableCell className="font-bold">Participant Category</TableCell>
//                 <TableCell className="font-bold">Organisers</TableCell>
//                 <TableCell className="font-bold">Date</TableCell>
//                 <TableCell className="font-bold">Time</TableCell>
//                 <TableCell className="font-bold">Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.length > 0 ? (
//                 events.map((event, index) => (
//                   <TableRow key={event._id} className="text-center">
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{event.eventName}</TableCell>
//                     <TableCell>{event.participants.join(", ") || "N/A"}</TableCell>
//                     <TableCell>{event.conductedBy}</TableCell>
//                     <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
//                     <TableCell>{event.time}</TableCell>
//                     <TableCell>{event.status}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center p-4">
//                     No events found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default ViewEvents;

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
} from "@mui/material";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events"); // Adjust URL as per backend
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize filtered events
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle search filtering
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.eventName?.toLowerCase().includes(lowercasedQuery) || // Ensure eventName exists
        (Array.isArray(event.participants) && // Check if participants is an array
          event.participants.some((participant) =>
            participant?.toLowerCase().includes(lowercasedQuery)
          ))
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  // Function to get status color
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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Event List</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <TextField
          label="Search by Event Name or Participant"
          variant="outlined"
          fullWidth
          className="max-w-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-bold">#</TableCell>
                <TableCell className="font-bold">Event Name</TableCell>
                <TableCell className="font-bold">Participant Category</TableCell>
                <TableCell className="font-bold">Organisers</TableCell>
                <TableCell className="font-bold">Date</TableCell>
                <TableCell className="font-bold">Time</TableCell>
                <TableCell className="font-bold">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <TableRow key={event._id} className="text-center">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{event.eventName}</TableCell>
                    <TableCell>{Array.isArray(event.participants) ? event.participants.join(", ") : "N/A"}</TableCell>
                    <TableCell>{event.conductedBy}</TableCell>
                    <TableCell>{event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>{event.time || "N/A"}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-lg ${getStatusColor(event.status)}`}>
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

