import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";
import SupervisorLayout from "../layouts/SupervisorLayout";
import { Inventory2, AddBox, Visibility } from "@mui/icons-material";

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
      const response = await axios.post(
        "http://localhost:5000/products/add",
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setOpen(true);
      setProduct({ itemid: "", productname: "", image: "" });
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <SupervisorLayout>
      <Container
        maxWidth="sm"
        className="mt-12 p-8 shadow-xl rounded-3xl bg-gradient-to-br from-white to-gray-50"
      >
        <Typography
          variant="h5"
          gutterBottom
          className="text-center font-semibold text-orange-500 mb-6 flex items-center justify-center gap-2"
        >
          <Inventory2 fontSize="medium" /> Add New Product
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <TextField
            label="Item ID"
            name="itemid"
            value={product.itemid}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2 />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Product Name"
            name="productname"
            value={product.productname}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2 />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2 />
                </InputAdornment>
              ),
            }}
          />
          <div className="flex gap-5">
         <Button
  variant="contained"
  type="submit"
  fullWidth
  className="rounded-xl py-3 font-semibold transition-all hover:scale-[1.03] flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
>
  <AddBox /> Add Product
</Button>

<Button
  variant="contained"
  fullWidth
  className="mt-5 rounded-xl py-3 font-semibold transition-all hover:scale-[1.03] flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
>

  <Visibility /> View Stock
</Button>
</div>
</Box>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" onClose={() => setOpen(false)}>
            Product added successfully!
          </Alert>
        </Snackbar>
      </Container>
    </SupervisorLayout>
  );
};

export default AddProduct;
