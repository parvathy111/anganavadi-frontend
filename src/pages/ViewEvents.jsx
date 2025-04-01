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
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../config/axiosinstance";
import { useNavigate } from "react-router-dom";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setOpenEditModal(true);
  };

  const handleCompleteEvent = async (eventId) => {
    const confirmComplete = window.confirm("Are you sure you want to mark this event as completed?");
    if (!confirmComplete) return;

    try {
      const response = await api.put(`/events/complete/${eventId}`);
      setEvents(events.map(event => 
        event._id === eventId ? { ...event, status: "Completed" } : event
      ));
    } catch (error) {
      console.error("Error completing event:", error.response?.data || error.message);
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEvent(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(`/events/update/${selectedEvent._id}`, selectedEvent);
      console.log(response)
      setEvents(events.map(event => (event._id === selectedEvent._id ? selectedEvent : event)));
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEvents = events.filter((event) =>
    event.eventName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Typography variant="h4" className="text-orange-600 font-extrabold">
            Events List
          </Typography>
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

        <Paper elevation={6} className="rounded-xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-orange-500 text-white">
                  <TableCell>#</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>No. of Participants</TableCell>
                  <TableCell>Participants</TableCell>
                  <TableCell>Organisers</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event, index) => (
                  <TableRow key={event._id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{event.eventName || "N/A"}</TableCell>
                    <TableCell>{event.participantCount || 0}</TableCell>
                    <TableCell>{event.participants?.join(", ") || "N/A"}</TableCell>
                    <TableCell>{event.conductedBy || "N/A"}</TableCell>
                    <TableCell>{event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>{event.time || "N/A"}</TableCell>
                    <TableCell>{event.status || "Unknown"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditEvent(event)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleCompleteEvent(event._id)}
                        disabled={event.status !== "Scheduled"}
                      >
                        <CheckCircleIcon 
                          color={event.status === "Scheduled" ? "success" : "disabled"} 
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEvent(event._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
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

        {/* Edit Event Dialog */}
        <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
          <DialogTitle className="text-orange-500">Edit Event</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Event Name"
                  fullWidth
                  margin="dense"
                  value={selectedEvent?.eventName || ""}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, eventName: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Participants"
                  fullWidth
                  margin="dense"
                  type="number"
                  value={selectedEvent?.participantCount || ""}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, participantCount: e.target.value })
                  }
                  variant="outlined"
                  disabled={selectedEvent?.status !== "Completed"}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Participants"
                  fullWidth
                  margin="dense"
                  select
                  SelectProps={{
                    multiple: true,
                  }}
                  value={selectedEvent?.participants || []}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      participants: e.target.value,
                    })
                  }
                  variant="outlined"
                >
                  <MenuItem value="Parent">Parent</MenuItem>
                  <MenuItem value="Pregnant/Lactating Women">Pregnant/Lactating Women</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Organisers"
                  fullWidth
                  margin="dense"
                  value={selectedEvent?.conductedBy || ""}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, conductedBy: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  margin="dense"
  type="date"
  value={selectedEvent?.date ? new Date(selectedEvent.date).toISOString().split("T")[0] : ""} 
  onChange={(e) =>
    setSelectedEvent({ ...selectedEvent, date: e.target.value })
  }
  variant="outlined"
/>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Time"
                  fullWidth
                  margin="dense"
                  type="time"
                  value={selectedEvent?.time || ""}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, time: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  fullWidth
                  margin="dense"
                  value={selectedEvent?.status || ""}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </WorkerLayout>
  );
};

export default ViewEvents;