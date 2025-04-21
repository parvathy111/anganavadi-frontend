import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Notes as NotesIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import WorkerLayout from "../layouts/WorkerLayout";
import api from "../config/axiosinstance";

const SendNotification = () => {
  const [formData, setFormData] = useState({
    anganwadiNo: "",
    fromDate: "",
    toDate: "",
    note: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/notification/send", formData);
      setSnackbar({
        open: true,
        message: `✅ Message sent to ${res.data.count} beneficiaries`,
        severity: "success",
      });

      // Reset form after success
      setFormData({
        anganwadiNo: "",
        fromDate: "",
        toDate: "",
        note: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `❌ Failed to send: ${error.response?.data?.error || error.message}`,
        severity: "error",
      });
    }
  };

  return (
    <WorkerLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2, mt:4 }}>
        <SendIcon sx={{ fontSize: 35, color: "#ff7043" }} />
        <div>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff7043" }}>
            Send WhatsApp Notification
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Notify registered beneficiaries with date range and optional note.
          </Typography>
        </div>
      </Box>

      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Anganwadi Number"
              name="anganwadiNo"
              value={formData.anganwadiNo}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type="date"
              name="fromDate"
              label="From Date"
              value={formData.fromDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type="date"
              name="toDate"
              label="To Date"
              value={formData.toDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Optional Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              sx={{
                background: "linear-gradient(45deg, #ff7043, #ff7043)",
                fontWeight: "bold",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(45deg, #ff7043, #ff7043)",
                },
              }}
            >
              Send Notification
            </Button>
          </Box>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </WorkerLayout>
  );
};

export default SendNotification;
