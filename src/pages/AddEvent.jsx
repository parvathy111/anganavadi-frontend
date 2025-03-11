import React, { useState } from "react";
import { TextField, Button, Typography, Container, Snackbar, Alert, Box, MenuItem } from "@mui/material";
import api from "../config/axiosinstance";
// import axios from "axios";

const AddEvent = () => {
  const [event, setEvent] = useState({
    eventName: "",
    participants: "",
    date: "",
    time: "",
    conductedBy: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("hi");
    try {
      const response = await api.post("events/add", {
        eventName: event.eventName,
        participants: event.participants ? [event.participants] : [],
        date: event.date,
        time: event.time,
        conductedBy: event.conductedBy,
      });
      console.log(response);
      setOpen(true);
      setEvent({ eventName: "", participants: "", date: "", time: "", conductedBy: "" });
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      <Typography variant="h5" gutterBottom>
        Add Event
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField label="Event Name" name="eventName" value={event.eventName} onChange={handleChange} required />
        <TextField
          select
          label="Participants"
          name="participants"
          value={event.participants}
          onChange={handleChange}
          required
        >
          <MenuItem value="Parent">Parent</MenuItem>
          <MenuItem value="Pregnant/Lactating women">Pregnant/Lactating women</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
        <TextField type="date" name="date" value={event.date} onChange={handleChange} required />
        <TextField type="time" name="time" value={event.time} onChange={handleChange} required />
        <TextField label="Conducted By" name="conductedBy" value={event.conductedBy} onChange={handleChange} required />
        <Button variant="contained" color="primary" type="submit">
          Add Event
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" onClose={() => setOpen(false)}>
          Event added successfully, pending supervisor approval!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddEvent;
