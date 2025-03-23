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
  Grid,
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
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://localhost:5000/supervisor/createsupervisor",
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2RhOTViNjNmNDZjNmIwOGU1MWFmYiIsImlhdCI6MTc0MjM3MTU5NH0.9qnp4PfQcjGEmh5CTAn8Jrm5p3ZKfUbQUIH3Sf-7YHU", // dummy token
          },
        }
      );
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
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <AdminLayout>
      {/* Heading section */}
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

      {/* Form container */}
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
            />

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
