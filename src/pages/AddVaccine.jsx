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
import axios from "axios";
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
      const token = localStorage.getItem("token");

      if (!token) {
        setSnackbar({
          open: true,
          message: "No authentication token found. Please log in.",
          severity: "error",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/vaccines/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
      setSnackbar({
        open: true,
        message: error.response ? error.response.data : error.message,
        severity: "error",
      });
    }
  };

  return (
    <WorkerLayout>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, marginTop: 5, borderRadius: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            sx={{ color: "#ff7043", fontWeight: "bold" }}
          >
            Add Vaccine Details
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Vaccine Name"
                  name="vaccine"
                  variant="outlined"
                  fullWidth
                  value={formData.vaccine}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VaccinesIcon sx={{ color: "#ff7043" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Stage"
                  name="stage"
                  variant="outlined"
                  fullWidth
                  value={formData.stage}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StageIcon sx={{ color: "#ff7043" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Dose"
                  name="dose"
                  variant="outlined"
                  fullWidth
                  value={formData.dose}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DoseIcon sx={{ color: "#ff7043" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Vaccinator"
                  name="vaccinator"
                  variant="outlined"
                  fullWidth
                  value={formData.vaccinator}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#ff7043" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Date"
                  name="lastDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.lastDate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon sx={{ color: "#ff7043" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Vaccinee Role"
                  name="vaccineeRole"
                  variant="outlined"
                  fullWidth
                  value={formData.vaccineeRole}
                  onChange={handleChange}
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
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleAddVaccine}
                sx={{
                  background: "linear-gradient(45deg, #ff7043, #ff7043)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  "&:hover": {
                    background: "linear-gradient(45deg, #fb8c00, #ff7043)",
                  },
                }}
              >
                Add Vaccine
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

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
    </WorkerLayout>
  );
};

export default AddVaccine;
