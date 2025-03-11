import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";
// import api from "../config/axiosinstance";

const AddProduct = () => {
  const [product, setProduct] = useState({
    itemid: "",
    productname: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
   
    console.log("Sending data:", product); // Debugging step
   
    try {
      const response = await axios.post("http://localhost:5000/products/add", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
      setOpen(true);
      setProduct({ itemid: "", productname: "", image: "" });
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.message || "Server error");
    }
  };
  

  return (
    <Container maxWidth="sm" className="mt-10 p-5 shadow-lg rounded-2xl bg-white">
      <Typography variant="h5" gutterBottom className="text-center font-bold">
        Add Product
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField label="Item ID" name="itemid" value={product.itemid} onChange={handleChange} required />
        <TextField label="Product Name" name="productname" value={product.productname} onChange={handleChange} required />
        <TextField label="Image URL" name="image" value={product.image} onChange={handleChange} required />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </Box>
      <Button variant="outlined" color="secondary" className="mt-4 w-full">
        View Stock
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" onClose={() => setOpen(false)}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;
