import { useEffect, useState } from "react";

import WorkerLayout from "../layouts/WorkerLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CalendarDays, Users, User, Clock, BadgeCheck } from "lucide-react";
import api from "../config/axiosinstance";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");

        setEvents(response.data);
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName?.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <WorkerLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography
              variant="h4"
              align="left"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-extrabold mb-2"
            >
              Events List :
            </Typography>
            <p className="mt-2 text-gray-600 text-sm text-left">
              This is the list of all events organized by Anganwadi.
            </p>
          </div>
          {/* Search bar aligned right */}
          <TextField
            label="Search by Event Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Paper elevation={6} className="rounded-xl shadow-xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500">
                  <TableCell className="text-white font-semibold">#</TableCell>
                  <TableCell className="text-white font-semibold">
                    <CalendarDays size={16} className="inline mr-2" />
                    Event Name
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Users size={16} className="inline mr-2" />
                    Participants
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <User size={16} className="inline mr-2" />
                    Organisers
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <CalendarDays size={16} className="inline mr-2" />
                    Date
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Clock size={16} className="inline mr-2" />
                    Time
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <BadgeCheck size={16} className="inline mr-2" />
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event, index) => (
                    <TableRow key={event._id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{event.eventName || "N/A"}</TableCell>
                      <TableCell>
                        {Array.isArray(event.participants)
                          ? event.participants.join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{event.conductedBy || "N/A"}</TableCell>
                      <TableCell>
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>{event.time || "N/A"}</TableCell>
                      <TableCell>
                        <span className={getStatusColor(event.status)}>
                          {event.status || "Unknown"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEvents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </WorkerLayout>
  );
};

export default ViewEvents;
