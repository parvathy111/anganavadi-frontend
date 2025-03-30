import React, { useState } from "react";
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
  Person as PersonIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  LocationOn as LocationIcon,
  Wc as WcIcon,
  SupervisorAccount as SupervisorIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";
import AdminLayout from "../layouts/AdminLayout";
import api from "../config/axiosinstance";

const AddSupervisor = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    localBody: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/supervisor/createsupervisor", formData);
      console.log("Response:", response.data); // Debugging step
      setOpen(true);
      setFormData({
        fullname: "",
        localBody: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      console.error("Request failed:", err.response?.data); // Log error details
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <AdminLayout>
      {/* Header Section */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <SupervisorIcon sx={{ fontSize: 36, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add New Supervisor
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Register a new supervisor and assign them to a local body.
          </Typography>
        </div>
      </Box>

      {/* Form Container */}
      <Container maxWidth="sm" sx={{ mt: 1 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              select
              label="Local Body"
              name="localBody"
              value={formData.localBody}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Municipality">Municipality</MenuItem>
              <MenuItem value="Panchayath">Panchayath</MenuItem>
              <MenuItem value="Corporation">Corporation</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <Button
              variant="contained"
              type="submit"
              size="medium"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(45deg, #ff7043, #ff7043)",
                color: "#fff",
                fontWeight: "bold",
                mt: 0.5,
                "&:hover": {
                  background: "linear-gradient(45deg, #fb8c00, #ff7043)",
                },
              }}
            >
              Create Supervisor
            </Button>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setOpen(false)}>
              Supervisor created successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default AddSupervisor;
