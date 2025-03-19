// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import navigate
// import axios from "axios";
// import { Box, TextField, Button, Select, MenuItem, Typography, Grid, FormControl, InputLabel } from "@mui/material";

// const RegistrationForm = () => {
//     const navigate = useNavigate(); // ✅ initialize navigate

//     const [role, setRole] = useState("parent");
//     const [formData, setFormData] = useState({
//         childname: "",
//         dob: "",
//         gender: "",
//         fathername: "",
//         mothername: "",
//         address: "",
//         phone: "",
//         email: "",
//         password: "",
//         fullname: "",
//         deliveryDate: "",
//         prevNumPreg: "",
//     });
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");
//         try {
//             const endpoint = `http://localhost:5000/beneficiaries/register/${role}`;
//             const payload = role === "parent" ? {
//                 childname: formData.childname,
//                 dob: formData.dob,
//                 gender: formData.gender,
//                 fathername: formData.fathername,
//                 mothername: formData.mothername,
//                 address: formData.address,
//                 phone: formData.phone,
//                 email: formData.email,
//                 password: formData.password,
//             } : {
//                 fullname: formData.fullname,
//                 deliveryDate: formData.deliveryDate,
//                 prevNumPreg: formData.prevNumPreg,
//                 address: formData.address,
//                 phone: formData.phone,
//                 email: formData.email,
//                 password: formData.password,
//             };

//             const response = await axios.post(endpoint, payload);
//             setMessage(response.data.message);
//             setFormData({}); 

//             // ✅ Redirect to login page
//             setTimeout(() => {
//                 navigate("/login");
//             }, 1000); // optional slight delay to show success msg
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Registration failed");
//         }
//     };

//     return (
//         <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, boxShadow: 3, borderRadius: 2 }}>
//             <Typography variant="h4" gutterBottom align="center">
//                 Register
//             </Typography>

//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <label>Select Role</label>
//                 <Select value={role} onChange={(e) => setRole(e.target.value)} required>
//                     <MenuItem value=""> </MenuItem>
//                     <MenuItem value="parent">Parent</MenuItem>
//                     <MenuItem value="preglactwomen">Pregnant/Lactating Woman</MenuItem>
//                 </Select>
//             </FormControl>

//             {message && (
//                 <Typography color={message.includes("successfully") ? "green" : "error"} sx={{ mb: 2 }}>
//                     {message}
//                 </Typography>
//             )}

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     {role === "parent" ? (
//                         <>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth label="Child's Name" name="childname" onChange={handleChange} required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth type="date" label="Date of Birth" name="dob" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormControl fullWidth>
//                                     <InputLabel>Gender</InputLabel>
//                                     <Select name="gender" value={formData.gender} onChange={handleChange} required>
//                                         <MenuItem value="">Select Gender</MenuItem>
//                                         <MenuItem value="Male">Male</MenuItem>
//                                         <MenuItem value="Female">Female</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth label="Father's Name" name="fathername" onChange={handleChange} required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth label="Mother's Name" name="mothername" onChange={handleChange} required />
//                             </Grid>
//                         </>
//                     ) : (
//                         <>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth label="Full Name" name="fullname" onChange={handleChange} required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth type="date" label="Delivery Date" name="deliveryDate" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <TextField fullWidth type="number" label="Previous Pregnancies" name="prevNumPreg" onChange={handleChange} required />
//                             </Grid>
//                         </>
//                     )}

//                     <Grid item xs={12}>
//                         <TextField fullWidth label="Address" name="address" onChange={handleChange} required />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField fullWidth type="tel" label="Phone" name="phone" onChange={handleChange} required />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} required />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} required />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <Button type="submit" variant="contained" fullWidth>
//                             Register
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Box>
//     );
// };

// export default RegistrationForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Person, CalendarToday, Home, Phone, Email, Lock, HomeOutlined, HowToRegOutlined } from "@mui/icons-material";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("parent");
  const initialForm = {
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
  };
  const [formData, setFormData] = useState(initialForm);
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
            }
          : {
              fullname: formData.fullname,
              deliveryDate: formData.deliveryDate,
              prevNumPreg: formData.prevNumPreg,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
            };

      const response = await axios.post(endpoint, payload);
      setMessage(response.data.message);
      setFormData(initialForm);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-200 ">
      {/* navbar */}
      <AppBar position="static" elevation={3} className="mb-10 bg-white shadow-md">
        <Toolbar className="flex justify-between bg-white">
          <Typography
            variant="h6"
            className="text-pink-700 font-bold"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            CareNest
          </Typography>
          <div className="flex space-x-10">
            <Button
              startIcon={<HomeOutlined />}
              onClick={() => navigate("/")}
              className="border-pink-700 text-pink-700 hover:bg-pink-50 hover:border-pink-800 hover:text-pink-800"
            >
              Back to Home
            </Button>
            <Button
              startIcon={<HowToRegOutlined />}
              onClick={() => navigate("/login")}
              className="border-pink-700 text-pink-700 hover:bg-pink-50 hover:border-pink-800 hover:text-pink-800"
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* form card */}
      <Card className="w-full max-w-2xl shadow-2xl rounded-3xl">
        <CardContent className="p-6">
          <Typography variant="h4" gutterBottom align="center" className="text-pink-700 font-bold mb-4">
            Registration
          </Typography>

          <FormControl fullWidth className="mb-4">
            <InputLabel>Select Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)} required>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="preglactwomen">Pregnant/Lactating Woman</MenuItem>
            </Select>
          </FormControl>

          {message && (
            <Typography color={message.includes("successfully") ? "green" : "error"} sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {role === "parent" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Child's Name"
                      name="childname"
                      value={formData.childname}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="DOB"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select name="gender" value={formData.gender} onChange={handleChange} required>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Father's Name"
                      name="fathername"
                      value={formData.fathername}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mother's Name"
                      name="mothername"
                      value={formData.mothername}
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
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Delivery Date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Previous Pregnancies"
                      name="prevNumPreg"
                      value={formData.prevNumPreg}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="tel"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
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
                  className="bg-gradient-to-r from-orange-700 to-orange-700 text-white font-semibold py-2 rounded-xl"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistrationForm;
