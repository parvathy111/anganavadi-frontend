import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  MenuItem, // ✅ Import MenuItem
} from "@mui/material";
import axios from "axios"; // Import axios for API requests

const AddVaccine = () => {
  const [formData, setFormData] = useState({
    vaccine: "",
    stage: "",
    dose: "",
    vaccinator: "",
    lastDate: "",
    vaccineeRole: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle adding a vaccine
  const handleAddVaccine = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        console.error("❌ No authentication token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/vaccines/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("✅ Vaccine successfully added!", response.data);
      }
    } catch (error) {
      console.error(
        "❌ Error adding vaccine:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Add Vaccine
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
              >
                <MenuItem value="Parent">Parent</MenuItem>
                <MenuItem value="PregLactWomen">
                  Pregnant/Lactating Women
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVaccine}
            >
              Add Vaccine
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddVaccine;
