import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
  MenuItem,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Event as EventIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  AddCircleOutline as AddIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import api from "../config/axiosinstance";
import WorkerLayout from "../layouts/WorkerLayout";
import axios from "axios";

const AddEvent = () => {
  const [event, setEvent] = useState({
    eventName: "",
    participants: "",
    date: "",
    time: "",
    conductedBy: "",
    anganwadiNo: "",
  });
  const [anganwadis, setAnganwadis] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const res = await api.get("/worker/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvent((prevEvent) => ({
          ...prevEvent,
          anganwadiNo: res.data.anganwadiNo, // Auto-fill anganwadi number
        }));
      } catch (err) {
        console.error("Error fetching worker details:", err);
        setError("Failed to fetch worker details");
      }
    };

    fetchWorkerDetails();
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/events/add", {
        eventName: event.eventName,
        participants: event.participants ? [event.participants] : [],
        date: event.date,
        time: event.time,
        conductedBy: event.conductedBy,
        anganwadiNo: event.anganwadiNo,
      });
      setOpen(true);
      setEvent({
        eventName: "",
        participants: "",
        date: "",
        time: "",
        conductedBy: "",
        anganwadiNo: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <WorkerLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <EventIcon sx={{ fontSize: 40, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add New Event
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Create and manage events for the Anganwadi, including participant
            details and schedule.
          </Typography>
        </div>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <TextField
              label="Event Name"
              name="eventName"
              value={event.eventName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              label="Participants"
              name="participants"
              value={event.participants}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Parent">Parent</MenuItem>
              <MenuItem value="Pregnant/Lactating women">
                Pregnant/Lactating women
              </MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>

            {/* Grouping Date and Time side by side */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon sx={{ color: "#ff7043" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                type="time"
                name="time"
                value={event.time}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Time"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon sx={{ color: "#ff7043" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TextField
              label="Conducted By"
              name="conductedBy"
              value={event.conductedBy}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Anganwadi No"
              name="anganwadiNo"
              value={event.anganwadiNo}
              disabled // Prevent manual changes
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(45deg, #ff7043, #ff7043)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(45deg, #fb8c00, #ff7043)",
                },
              }}
            >
              Add Event
            </Button>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setOpen(false)}>
              Event added successfully, pending supervisor approval!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </WorkerLayout>
  );
};

export default AddEvent;
