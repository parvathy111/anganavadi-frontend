import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
  Paper,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Fastfood as FastfoodIcon,
  Subject as SubjectIcon,
  CameraAlt as CameraAltIcon,
  Event as EventIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";
import WorkerLayout from "../layouts/WorkerLayout";
import api from "../config/axiosinstance";

const AddDailyTrack = () => {
  const [formData, setFormData] = useState({
    openingTime: "",
    closingTime: "",
    noOfPresents: "",
    noOfAbsents: "",
    todayMeal: "",
    topicLearned: "",
    otherActivities: "",
    studentImage: null,
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, studentImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await api.post("/dailytracks/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpen(true);
      setFormData({
        openingTime: "",
        closingTime: "",
        noOfPresents: "",
        noOfAbsents: "",
        todayMeal: "",
        topicLearned: "",
        otherActivities: "",
        studentImage: null,
      });

    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <WorkerLayout>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <EventIcon sx={{ fontSize: 36, color: "#FF9800" }} />
        <div>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FF9800" }}>
            Add Daily Track Entry
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Track daily activities, meals, and attendance.
          </Typography>
        </div>
      </Box>

      <Container maxWidth="sm" sx={{ mt: 1 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            {/* Opening Time & Closing Time */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Opening Time (HH:MM AM/PM)"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Closing Time (HH:MM AM/PM)"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Number of Presents & Absents */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of Presents"
                  name="noOfPresents"
                  type="number"
                  value={formData.noOfPresents}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of Absents"
                  name="noOfAbsents"
                  type="number"
                  value={formData.noOfAbsents}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Today's Meal"
              name="todayMeal"
              value={formData.todayMeal}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FastfoodIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Topic Learned"
              name="topicLearned"
              value={formData.topicLearned}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Other Activities"
              name="otherActivities"
              value={formData.otherActivities}
              onChange={handleChange}
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon sx={{ color: "#FF9800", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              component="label"
              startIcon={<CameraAltIcon />}
              sx={{
                background: "linear-gradient(45deg, #FF9800, #F57C00)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "linear-gradient(45deg, #F57C00, #E65100)" },
              }}
            >
              Upload Student Image
              <input type="file" hidden name="studentImage" onChange={handleFileChange} />
            </Button>

            <Button
              variant="contained"
              type="submit"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(45deg, #FF9800, #F57C00)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "linear-gradient(45deg, #F57C00, #E65100)" },
              }}
            >
              Add Daily Track
            </Button>
          </Box>

          <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="success" onClose={() => setOpen(false)}>
              Daily track entry added successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </WorkerLayout>
  );
};

export default AddDailyTrack;
