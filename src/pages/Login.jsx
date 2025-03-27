import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  InputAdornment,
} from "@mui/material";
import { MailOutline, LockOutlined, PersonOutline } from "@mui/icons-material";
import api from "../config/axiosinstance";
import { storeTokenAfterLogin } from "../util";
import { useNavigate } from "react-router-dom";

const roles = ["Supervisor", "Worker", "Parent", "PregLactWomen"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint =
      role.toLowerCase() === "parent" || role.toLowerCase() === "preglactwomen"
        ? "beneficiaries/login"
        : `${role.toLowerCase()}/login`;

    try {
      const res = await api.post(endpoint, { email, password, role });
      if (
        res.data.status === "inactive" &&
        (role.toLowerCase() === "parent" ||
          role.toLowerCase() === "preglactwomen")
      ) {
        setError("Your account is inactive. Please contact admin.");
        return;
      }
      storeTokenAfterLogin(res.data.token);
      if (role.toLowerCase() === "supervisor") {
        navigate("/supervisor-dashboard");
      } else if (role.toLowerCase() === "worker") {
        navigate("/Worker-dashboard");
      } else if (
        role.toLowerCase() === "parent" ||
        role.toLowerCase() === "preglactwomen"
      ) {
        navigate("/beneficiary-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    // <Card className="w-full max-w-md shadow-2xl rounded-3xl p-8 bg-white">
    <CardContent>
      <Typography
        variant="h5"
        className="text-center mb-6 font-bold text-pink-600 p-5"
      >
        Login to Your Account
      </Typography>

      {error && (
        <Typography className="text-red-600 mb-4 text-center text-sm">
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline className="text-pink-500" />
                </InputAdornment>
              ),
            }}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined className="text-pink-500" />
                </InputAdornment>
              ),
            }}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <TextField
            select
            label="Role"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline className="text-pink-500" />
                </InputAdornment>
              ),
            }}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="bg-gradient-to-r from-orange-700 to-pink-700 hover:from-orange-500 hover:to-pink-600 text-white py-3 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Login
        </Button>
      </form>
    </CardContent>
    // </Card>
  );
}
