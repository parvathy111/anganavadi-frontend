import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import api from "../config/axiosinstance";

const Adminlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const res = await api.post("/admin/login", {
        username,
        password,
      });

      if (res.status === 200) {
        console.log("Login successful:", res.data);
        
        // Save token if needed
        localStorage.setItem("token", res.data.token);

        // Redirect to Admin Dashboard
        navigate("/admin-dashboard");
      } else {
        console.log("Login failed: Unexpected response");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 8, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
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
      </Paper>
    </Container>
  );
};

export default Adminlogin;
