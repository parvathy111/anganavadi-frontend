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
  Divider,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Fastfood as FastfoodIcon,
  Subject as SubjectIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Restaurant as RestaurantIcon,
  School as SchoolIcon,
  Sports as SportsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import WorkerLayout from "../layouts/WorkerLayout";
import api from "../config/axiosinstance";
import { format, parseISO, isMatch, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";

const WorkerViewDailyTrack = () => {
  const [dailyTracks, setDailyTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("date"); // 'date', 'month', 'year'

  useEffect(() => {
    const fetchDailyTracks = async () => {
      try {
        const response = await api.get("/dailytracks/view");
        setDailyTracks(response.data);
        setFilteredTracks(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch daily track entries. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTracks();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTracks(dailyTracks);
      return;
    }

    const filtered = dailyTracks.filter(track => {
      const trackDate = parseISO(track.createdAt);
      
      try {
        if (searchType === "date") {
          // Search by specific date (format: yyyy-MM-dd)
          const searchDate = new Date(searchTerm);
          return format(trackDate, "yyyy-MM-dd") === format(searchDate, "yyyy-MM-dd");
        } else if (searchType === "month") {
          // Search by month and year (format: yyyy-MM)
          const [year, month] = searchTerm.split("-");
          const startDate = startOfMonth(new Date(year, month - 1, 1));
          const endDate = endOfMonth(new Date(year, month - 1, 1));
          return isWithinInterval(trackDate, { start: startDate, end: endDate });
        } else if (searchType === "year") {
          // Search by year (format: yyyy)
          return format(trackDate, "yyyy") === searchTerm;
        }
        return true;
      } catch (e) {
        return false;
      }
    });

    setFilteredTracks(filtered);
  }, [searchTerm, searchType, dailyTracks]);

  const renderInfoItem = (icon, label, value) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Box sx={{ color: "warning.main", mr: 1 }}>{icon}</Box>
      <Typography variant="body2">
        <strong>{label}:</strong> {value || "Not specified"}
      </Typography>
    </Box>
  );

  const getSearchPlaceholder = () => {
    switch (searchType) {
      case "date": return "YYYY-MM-DD";
      case "month": return "YYYY-MM";
      case "year": return "YYYY";
      default: return "Search...";
    }
  };

  return (
    <WorkerLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EventIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" color="warning.dark">
                Daily Track Entries
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                View and manage all daily activity records
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                label="Search By"
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              variant="outlined"
              size="small"
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>
        
        {/* <Divider sx={{ borderColor: 'warning.light' }} /> */}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress color="warning" size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4, bgcolor: 'error.light' }}>
            {error}
          </Alert>
        ) : filteredTracks.length === 0 ? (
          <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              {searchTerm ? "No matching records found" : "No daily track entries found"}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredTracks.map((track, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    border: '1px solid',
                    borderColor: 'warning.light',
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                      borderColor: 'warning.main',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="warning.dark">
                        {format(parseISO(track.createdAt), "MMMM d, yyyy")}
                      </Typography>
                      <Chip
                        label={format(parseISO(track.createdAt), "EEEE")}
                        size="small"
                        color="warning"
                        sx={{ color: 'warning.contrastText' }}
                      />
                    </Box>

                    {/* Rest of your card content remains the same */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="warning.main" gutterBottom>
                        Attendance
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Chip
                          icon={<CheckCircleIcon />}
                          label={`Present: ${track.noOfPresents}`}
                          color="success"
                          size="small"
                        />
                        <Chip
                          icon={<CancelIcon />}
                          label={`Absent: ${track.noOfAbsents}`}
                          color="error"
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'warning.light', my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="warning.main" gutterBottom>
                        Timings
                      </Typography>
                      {renderInfoItem(
                        <AccessTimeIcon fontSize="small" />,
                        "Opening",
                        track.openingTime
                      )}
                      {renderInfoItem(
                        <AccessTimeIcon fontSize="small" />,
                        "Closing",
                        track.closingTime
                      )}
                    </Box>

                    <Divider sx={{ borderColor: 'warning.light', my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="warning.main" gutterBottom>
                        Activities
                      </Typography>
                      {renderInfoItem(
                        <RestaurantIcon fontSize="small" />,
                        "Today's Meal",
                        track.todayMeal
                      )}
                      {renderInfoItem(
                        <SchoolIcon fontSize="small" />,
                        "Topic Learned",
                        track.topicLearned
                      )}
                      {track.otherActivities &&
                        renderInfoItem(
                          <SportsIcon fontSize="small" />,
                          "Other Activities",
                          track.otherActivities
                        )}
                    </Box>

                    {track.studentImage && (
                      <>
                        <Divider sx={{ borderColor: 'warning.light', my: 2 }} />
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="subtitle2" color="warning.main" gutterBottom>
                            Activity Photo
                          </Typography>
                          <Box
                            component="img"
                            src={`${process.env.REACT_APP_API_URL}/uploads/${track.studentImage}`}
                            alt="Student activity"
                            sx={{
                              maxWidth: "100%",
                              maxHeight: 200,
                              borderRadius: 2,
                              border: "1px solid",
                              borderColor: "warning.light",
                            }}
                          />
                        </Box>
                      </>
                    )}
                    {/* ... */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </WorkerLayout>
  );
};

export default WorkerViewDailyTrack;

