import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import api from "../config/axiosinstance";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const userType = localStorage.getItem("userRole");
      let apiUrl = "";
      let dashboardPath = "";

      if (userType === "supervisor") {
        apiUrl = "/supervisor/changepassword";
        dashboardPath = "/supervisor-dashboard";
      } else if (userType === "worker") {
        apiUrl = "/worker/changepassword";
        dashboardPath = "/worker-dashboard";
      } else {
        setError("Invalid user type.");
        return;
      }

      const response = await api.post(apiUrl, { oldPassword, newPassword });
      setSuccess(response.data.message);
      setOpen(true);
      setTimeout(() => navigate(dashboardPath), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>

    <Box
  sx={{
    mb: 2,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    justifyContent: "flex-start", // Align to the left
  }}
>
  <LockOpenIcon sx={{ fontSize: 36, color: "#ff7043" }} />
  <div>
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff7043" }}>
      Change Password
    </Typography>
    <Typography variant="body2" sx={{ color: "gray" }}>
      Update your password to secure your account.
    </Typography>
  </div>
</Box> 

    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            fullWidth
            type="password"
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#ff7043", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            type="submit"
            size="medium"
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
            Update Password
          </Button>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setOpen(false)}>
            Password changed successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
    </>
  );
};


export default ChangePassword;
