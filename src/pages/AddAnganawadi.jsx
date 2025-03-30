import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
  InputAdornment,
  Paper,
  MenuItem,
} from "@mui/material";
import {
  Home as HomeIcon,
  LocationOn as LocationIcon,
  AddCircleOutline as AddIcon,
  AccountBalance as BodyNameIcon,
  FormatListNumbered as WardIcon,
} from "@mui/icons-material";
import SupervisorLayout from "../layouts/SupervisorLayout";
import api from "../config/axiosinstance";

const AddAnganawadi = () => {
  const [formData, setFormData] = useState({
    anganwadiNo: "",
    localBody: "",
    localBodyName: "",
    wardNumber: "",
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
      await api.post("/anganavadi/createanganwadi")
      setOpen(true);
      setFormData({
        anganwadiNo: "",
        localBody: "",
        localBodyName: "",
        wardNumber: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <SupervisorLayout>
      {/* Heading */}
      <Box sx={{ mb: 10, mt: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <HomeIcon sx={{ fontSize: 36, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add Anganwadi Center
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Register a new Anganwadi with its details.
          </Typography>
        </div>
      </Box>

      {/* Form */}
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
              label="Anganwadi Number"
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
            />

            <TextField
              select
              fullWidth
              label="Local Body Type"
              name="localBody"
              value={formData.localBody}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: "#ff7043", fontSize: 20 }} />
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
              label="Local Body Name"
              name="localBodyName"
              value={formData.localBodyName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BodyNameIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Ward Number"
              name="wardNumber"
              value={formData.wardNumber}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WardIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

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
              Create Anganwadi
            </Button>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setOpen(false)}>
              Anganwadi created successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </SupervisorLayout>
  );
};

export default AddAnganawadi;
