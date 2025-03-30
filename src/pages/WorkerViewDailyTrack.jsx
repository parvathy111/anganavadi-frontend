import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Fastfood as FastfoodIcon,
  Subject as SubjectIcon,
  CameraAlt as CameraAltIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import WorkerLayout from "../layouts/WorkerLayout";
import api from "../config/axiosinstance";

const WorkerViewDailyTrack = () => {
  const [dailyTracks, setDailyTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDailyTracks = async () => {
      try {
        const response = await api.get("/dailytracks/view");
        setDailyTracks(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching daily track entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTracks();
  }, []);

  return (
    <WorkerLayout>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <EventIcon sx={{ fontSize: 36, color: "#ff9800" }} />
        <div>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800" }}>
            View Daily Track Entries
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            View daily attendance, meals, and activities recorded in your Anganwadi.
          </Typography>
        </div>
      </Box>

      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
          {error && <Alert severity="error">{error}</Alert>}

          {dailyTracks.length > 0 && (
            <Grid container spacing={2}>
              {dailyTracks.map((track, index) => (
                <Grid item xs={12} key={index}>
                  <Card elevation={4} sx={{ borderRadius: 3, backgroundColor: "#fff3e0" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff9800" }}>
                        {new Date(track.createdAt).toDateString()}
                      </Typography>

                      <Typography>
                        <AccessTimeIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                        Opening Time: <strong>{track.openingTime}</strong>
                      </Typography>

                      <Typography>
                        <AccessTimeIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                        Closing Time: <strong>{track.closingTime}</strong>
                      </Typography>

                      <Typography>
                        <PeopleIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                        Presents: <strong>{track.noOfPresents}</strong> | Absents: <strong>{track.noOfAbsents}</strong>
                      </Typography>

                      <Typography>
                        <FastfoodIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                        Meal: <strong>{track.todayMeal}</strong>
                      </Typography>

                      <Typography>
                        <SubjectIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                        Topic Learned: <strong>{track.topicLearned}</strong>
                      </Typography>

                      {track.otherActivities && (
                        <Typography>
                          <SubjectIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                          Other Activities: <strong>{track.otherActivities}</strong>
                        </Typography>
                      )}

                      {track.studentImage && (
                        <Box mt={2}>
                          <CameraAltIcon sx={{ color: "#ff9800", fontSize: 18, mr: 1 }} />
                          <img
                            src={`http://localhost:5000/uploads/${track.studentImage}`}
                            alt="Student Activity"
                            style={{ width: "100%", maxHeight: 200, borderRadius: 8 }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </WorkerLayout>
  );
};

export default WorkerViewDailyTrack;
