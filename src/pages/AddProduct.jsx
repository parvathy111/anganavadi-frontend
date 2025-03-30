import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Inventory2 as InventoryIcon,
  AddBox as AddIcon,
  Image as ImageIcon,
  Numbers as NumbersIcon,
} from "@mui/icons-material";

import SupervisorLayout from "../layouts/SupervisorLayout";
import api from "../config/axiosinstance";

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

    try {
      const response = await api.post("/products/add", product);

      setOpen(true);
      setProduct({ itemid: "", productname: "", image: "" });
    } catch (err) {
      console.error("Request failed:", err.response?.data); // Log error details
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <SupervisorLayout>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <InventoryIcon sx={{ fontSize: 40, color: "#ff7043" }} />
        <div>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#ff7043" }}
          >
            Add New Product
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Add new products to the inventory for your Anganwadi center.
          </Typography>
        </div>
      </Box>

      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <TextField
              label="Item ID"
              name="itemid"
              value={product.itemid}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon sx={{ color: "#ff7043" }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon sx={{ color: "#ff7043" }} />
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon sx={{ color: "#ff7043" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(45deg, #ff7043, #ff7043)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(45deg, #fb8c00, #ff7043)",
                },
              }}
            >
              Add Product
            </Button>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setOpen(false)}>
              Product added successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </SupervisorLayout>
  );
};

export default AddProduct;
