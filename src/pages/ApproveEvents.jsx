import React, { useEffect, useState } from "react";
import SupervisorLayout from "../layouts/SupervisorLayout";
import {
  CalendarDays,
  Clock,
  Users,
  User,
  CheckCircle,
  XCircle,
  Building2,
} from "lucide-react";
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  TextField,
  TablePagination,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../config/axiosinstance";

const ApproveEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        if (!token) {
            console.error("No token found, please login");
            return;
        }

        const res = await api.get("/events/view-events")

        if (res.status === 200) {
            setEvents(Array.isArray(res.data) ? res.data : []);
        } else {
            console.error("Failed to fetch events. Status:", res.status);
        }
    } catch (err) {
        console.error("Error fetching events:", err.response ? err.response.data : err.message);
    } finally {
        setLoading(false);
    }
};


  const handleApprove = async (eventId) => {
    try {
      await api.put(`/events/approve/${eventId}`)
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId ? { ...e, status: "Approved" } : e
        )
      );
      setOpenSnackbar({
        open: true,
        message: "Event approved successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Error approving event:", err);
    }
  };

  const handleReject = async (eventId) => {
    try {
      await api.put(`/events/reject/${eventId}`);
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId ? { ...e, status: "Rejected" } : e
        )
      );
      setOpenSnackbar({
        open: true,
        message: "Event rejected successfully!",
        severity: "error",
      });
    } catch (err) {
      console.error("Error rejecting event:", err);
    }
  };

  const filteredEvents = events.filter((event) =>
    (event.eventName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.anganwadiNo || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <SupervisorLayout>
      <Container maxWidth="xl" className="mt-3">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography
              variant="h4"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Approve Events
            </Typography>
            <p className="text-gray-600 mb-2">
              Review and manage event requests below.
            </p>
          </div>

          {/* Search bar */}
          <TextField
            label="Search by Event Name / Anganwadi No"
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
                  <TableCell align="center" className="text-white font-semibold">
                    Event Name
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    <CalendarDays size={16} className="inline mr-2" />
                    Date
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    <Clock size={16} className="inline mr-2" />
                    Time
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    Status
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    <Users size={16} className="inline mr-2" />
                    Participants
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    <User size={16} className="inline mr-2" />
                    Conducted By
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    <Building2 size={16} className="inline mr-2" />
                    Anganwadi No
                  </TableCell>
                  <TableCell align="center" className="text-white font-semibold">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event) => (
                    <TableRow key={event._id} hover>
                      <TableCell align="center">{event.eventName}</TableCell>
                      <TableCell align="center">
                        {new Date(event.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">{event.time}</TableCell>
                      <TableCell align="center">
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded-md ${
                            event.status === "Approved"
                              ? "bg-green-200 text-green-700"
                              : event.status === "Rejected"
                              ? "bg-red-200 text-red-700"
                              : "bg-yellow-200 text-yellow-700"
                          }`}
                        >
                          {event.status}
                        </span>
                      </TableCell>
                      <TableCell align="center">{event.participantCount}</TableCell>
                      <TableCell align="center">{event.conductedBy}</TableCell>
                      <TableCell align="center">{event.anganwadiNo || "-"}</TableCell>
                      <TableCell align="center">
                        {event.status === "Pending Approval" && (
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApprove(event._id)}
                              startIcon={<CheckCircle size={16} />}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleReject(event._id)}
                              startIcon={<XCircle size={16} />}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
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

        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
        >
          <Alert
            severity={openSnackbar.severity}
            onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </SupervisorLayout>
  );
};

export default ApproveEvents;
