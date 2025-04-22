import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import { ArrowBack, AdminPanelSettings } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import api from "../config/axiosinstance";
import dashboardIcon from "../assets/admin1.png";

// Orange color theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f57c00",
    },
    secondary: {
      main: "#ffcc80",
    },
    background: {
      default: "#fff8e1",
    },
    text: {
      primary: "#333333",
    },
  },
});

const Adminlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", { username, password });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Header */}
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdminPanelSettings sx={{ marginRight: 1, color: "white" }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              CareNest Admin Portal
            </Typography>
          </Box>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                backgroundColor: "#ef6c00",
              },
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Login Form + Image Grid */}
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            padding: 4,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Left: Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom color="primary" textAlign="center">
                  Admin Login
                </Typography>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </Grid>

            {/* Right: Image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "block" },
                textAlign: "center",
              }}
            >
              <img src={dashboardIcon} alt="Bottom Image" className="rounded-xl" />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          // backgroundColor: theme.palette.primary.main,
          color: "orange",
          marginTop: 10,
          paddingY: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} CareNest Admin Panel. All rights reserved.
        </Typography>
        <Typography variant="body2">
          For authorized personnel only. Activities are monitored and logged.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Adminlogin;
