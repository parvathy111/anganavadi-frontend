import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";

import WorkerLayout from "../layouts/WorkerLayout";
import {
  Vaccines as VaccinesIcon,
  Timeline as StageIcon,
  Opacity as DoseIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";
import api from "../config/axiosinstance";

const AddVaccine = () => {
  const [formData, setFormData] = useState({
    vaccine: "",
    stage: "",
    dose: "",
    vaccinator: "",
    lastDate: "",
    vaccineeRole: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddVaccine = async () => {
    try {
      // Make API call to add vaccine
      const response = await api.post("/vaccines/add", formData);

      // Check if the vaccine was added successfully
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Vaccine successfully added!",
          severity: "success",
        });
        setFormData({
          vaccine: "",
          stage: "",
          dose: "",
          vaccinator: "",
          lastDate: "",
          vaccineeRole: "",
        });
      }
    } catch (error) {
      if (error.response) {
        // If the error is from the server (e.g., vaccine already exists)
        setSnackbar({
          open: true,
          message: error.response.data.message || error.response.data.error,
          severity: "error",
        });
      } else {
        // If error occurred on the client side (e.g., network issues)
        setSnackbar({
          open: true,
          message: "An error occurred while adding the vaccine.",
          severity: "error",
        });
      }
    }
  };

  return (
    <WorkerLayout>
      {/* Heading with Icon and Description */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <VaccinesIcon sx={{ fontSize: 40, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add New Vaccine
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Register vaccines with complete details for targeted beneficiaries.
          </Typography>
        </div>
      </Box>

      {/* Form Section */}
      <Container maxWidth="sm" sx={{ mt: 1 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddVaccine();
            }}
          >
            <TextField
              label="Vaccine Name"
              name="vaccine"
              value={formData.vaccine}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VaccinesIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StageIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Dose"
              name="dose"
              value={formData.dose}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DoseIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Vaccinator"
              name="vaccinator"
              value={formData.vaccinator}
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
              type="date"
              name="lastDate"
              label="Last Date"
              value={formData.lastDate}
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
              select
              label="Vaccinee Role"
              name="vaccineeRole"
              value={formData.vaccineeRole}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Parent">Parent</MenuItem>
              <MenuItem value="PregLactWomen">
                Pregnant/Lactating Women
              </MenuItem>
            </TextField>

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
              Add Vaccine
            </Button>
          </Box>

          {/* Snackbar for success/error messages */}
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

export default AddVaccine;
