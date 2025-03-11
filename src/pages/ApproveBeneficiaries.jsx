
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  TextField
} from "@mui/material";
import axios from "axios";

const ApproveBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/beneficiaries/all");
      const sortedData = response.data.beneficiaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBeneficiaries(sortedData);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/beneficiaries/approve/${id}`);
      setBeneficiaries((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Active" } : b)));
      setOpenSnackbar({ open: true, message: "Beneficiary approved successfully!", severity: "success" });
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/beneficiaries/remove/${id}`);
      setBeneficiaries((prev) => prev.filter((b) => b._id !== id));
      setOpenSnackbar({ open: true, message: "Beneficiary removed successfully!", severity: "error" });
    } catch (error) {
      console.error("Error removing beneficiary:", error);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    (b.fullname || b.childname).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md" className="mt-10 p-5 bg-white shadow-lg rounded-2xl">
      <Typography variant="h5" className="text-center font-bold mb-4">Approve Beneficiaries</Typography>

      {/* Search Bar */}
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Approve</b></TableCell>
              <TableCell><b>Remove</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBeneficiaries.map((beneficiary, index) => (
              <TableRow key={beneficiary._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{beneficiary.fullname || beneficiary.childname}</TableCell>
                <TableCell>{beneficiary.address}</TableCell>
                <TableCell>{beneficiary.phone}</TableCell>
                <TableCell>{beneficiary.role === "parent" ? "Parent" : "Pregnant/Lactating Woman"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-bold rounded-md ${beneficiary.status === "Active" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}>
                    {beneficiary.status === "Active" ? "Approved" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  {beneficiary.status !== "Active" && (
                    <Button variant="contained" color="success" size="small" onClick={() => handleApprove(beneficiary._id)}>
                      Approve
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" size="small" onClick={() => handleRemove(beneficiary._id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar.open} autoHideDuration={3000} onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}>
        <Alert severity={openSnackbar.severity} onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ApproveBeneficiaries;
