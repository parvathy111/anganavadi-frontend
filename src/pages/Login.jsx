import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import api from "../config/axiosinstance";

const roles = ["Supervisor", "Worker", "Parent", "PregLactWomen"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    console.log(import.meta.env.VITE_BACKEND_URL);

    const endpoint =
      role.toLowerCase() === "parent" || role.toLowerCase() === "preglactwomen"
        ? "beneficiaries/login"
        : `${role.toLowerCase()}/login`; // Convert role to lowercase for URL
    try {
      const res = await api.post(endpoint, { email, password, role });
      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg rounded-2xl p-6">
        <CardContent>
          <Typography variant="h5" className="text-center mb-6 font-bold">
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mt-8"></div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-8"></div>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-8"></div>
            <TextField
              select
              label="Role"
              variant="outlined"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
            <div className="mt-8"></div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
