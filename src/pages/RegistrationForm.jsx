import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Select, MenuItem, Typography, Grid, FormControl, InputLabel } from "@mui/material";

const RegistrationForm = () => {
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
    });
    const [message, setMessage] = useState(""); // For success or error messages

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        try {
            const endpoint = `http://localhost:5000/beneficiaries/register/${role}`;
            const payload = role === "parent" ? {
                childname: formData.childname,
                dob: formData.dob,
                gender: formData.gender,
                fathername: formData.fathername,
                mothername: formData.mothername,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
            } : {
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
            setFormData({}); // Clear form after successful registration
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", padding: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Register
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                {/* <InputLabel>Select Role</InputLabel> */}
                <label>Select Role</label>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value=" "></MenuItem>
                    <MenuItem value="parent">Parent</MenuItem>
                    <MenuItem value="preglactwomen">Pregnant/Lactating Woman</MenuItem>
                </Select>
            </FormControl>

            {message && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {message}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {role === "parent" ? (
                        <>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Child's Name" name="childname" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="date" label="Date of Birth" name="dob" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <MenuItem value="">Select Gender</MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Father's Name" name="fathername" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Mother's Name" name="mothername" onChange={handleChange} required />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Full Name" name="fullname" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="date" label="Delivery Date" name="deliveryDate" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="number" label="Previous Pregnancies" name="prevNumPreg" onChange={handleChange} required />
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12}>
                        <TextField fullWidth label="Address" name="address" onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth type="tel" label="Phone" name="phone" onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} required />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default RegistrationForm;
