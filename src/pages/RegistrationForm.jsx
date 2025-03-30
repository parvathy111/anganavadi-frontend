import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import {
  PersonOutline,
  Home,
  MailOutline,
  LockOutlined,
  Phone,
  ChildCare,
  Business,
} from "@mui/icons-material";
import api from "../config/axiosinstance";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("parent");
  const [formData, setFormData] = useState({
    childname: "",
    dob: "",
    gender: "",
    fathername: "",
    mothername: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    fullname: "",
    deliveryDate: "",
    prevNumPreg: "",
    anganwadiNo: "", // Added field
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const endpoint = `http://localhost:5000/beneficiaries/register/${role}`;
      const payload =
        role === "parent"
          ? {
              childname: formData.childname,
              dob: formData.dob,
              gender: formData.gender,
              fathername: formData.fathername,
              mothername: formData.mothername,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
              anganwadiNo: formData.anganwadiNo, // Include in payload
            }
          : {
              fullname: formData.fullname,
              deliveryDate: formData.deliveryDate,
              prevNumPreg: formData.prevNumPreg,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
              anganwadiNo: formData.anganwadiNo, // Include in payload
            };

      const response = await api.post(endpoint, payload);
      setMessage(response.data.message);
      setFormData({});

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <CardContent sx={{ overflow: "hidden" }}>
      <Typography
        variant="h5"
        align="center"
        className="text-pink-600 p-2 font-bold"
      >
        Create a new account
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <MenuItem value="parent">Parent</MenuItem>
          <MenuItem value="preglactwomen">Pregnant/Lactating Woman</MenuItem>
        </Select>
      </FormControl>

      {message && (
        <Typography
          color={message.includes("successfully") ? "green" : "error"}
          sx={{ mb: 2 }}
        >
          {message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {role === "parent" ? (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Child's Name"
                  name="childname"
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ChildCare className="text-pink-500" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fathername"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  name="mothername"
                  onChange={handleChange}
                  required
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullname"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Delivery Date"
                  name="deliveryDate"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Previous Pregnancies"
                  name="prevNumPreg"
                  onChange={handleChange}
                  required
                />
              </Grid>
            </>
          )}

          {/* Anganwadi Number Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Anganwadi Number"
              name="anganwadiNo"
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business className="text-pink-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="tel"
              label="Phone"
              name="phone"
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone className="text-pink-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home className="text-pink-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline className="text-pink-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined className="text-pink-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-gradient-to-r from-orange-700 to-pink-700 hover:from-orange-500 hover:to-pink-600 text-white py-3 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default RegistrationForm;
