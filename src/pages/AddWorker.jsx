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
  Grid,
} from "@mui/material";
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  LocationOn as LocationIcon,
  Wc as WcIcon,
  CalendarToday as CalendarIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";

import SupervisorLayout from "../layouts/SupervisorLayout";
import api from "../config/axiosinstance";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: "",
    anganwadiNo: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [anganwadis, setAnganwadis] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  // Fetch Anganwadi numbers
  useEffect(() => {
    const fetchAnganwadis = async () => {
      try {
        const res = await api.get("/anganavadi/getallanganwadi");
        setAnganwadis(res.data.data);
      } catch (err) {
        console.error("Error fetching anganwadis:", err);
        setError("Failed to load Anganwadi list");
      }
    };
    fetchAnganwadis();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/worker/createworker", formData);
      setOpen(true);
      setFormData({
        name: "",
        anganwadiNo: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        dob: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <SupervisorLayout>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <PersonIcon sx={{ fontSize: 36, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add New Worker
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Register a new Anganwadi worker and assign them to a center.
          </Typography>
        </div>
      </Box>

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
              label="Worker Name"
              name="name"
              value={formData.name}
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

            {/* ✅ Only showing anganwadiNo */}
            <TextField
              fullWidth
              select
              label="Select Anganwadi No"
              name="anganwadiNo"
              value={formData.anganwadiNo}
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
              {anganwadis.map((aw) => (
                <MenuItem key={aw._id} value={aw.anganwadiNo}>
                  {aw.anganwadiNo.toUpperCase()}
                </MenuItem>
              ))}
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

            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  label="Date of Birth"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

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
              Create Worker
            </Button>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setOpen(false)}>
              Worker created successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </SupervisorLayout>
  );
};

export default AddWorker;
