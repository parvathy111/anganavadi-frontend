import React, { useEffect, useState } from "react";
import WorkerLayout from '../layouts/WorkerLayout';
import { User, MapPin, Phone, ShieldCheck, Users, Trash2, CheckCircle } from 'lucide-react';
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
  TextField,
  TablePagination,
  CircularProgress,
  InputAdornment
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import api from "../config/axiosinstance";

const ApproveBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await api.get("/beneficiaries/all");
      const sortedData = response.data.beneficiaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBeneficiaries(sortedData);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/beneficiaries/approve/${id}`);
      setBeneficiaries((prev) => prev.map((b) => (b._id === id ? { ...b, status: "Active" } : b)));
      setOpenSnackbar({ open: true, message: "Beneficiary approved successfully!", severity: "success" });
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/beneficiaries/remove/${id}`);
      setBeneficiaries((prev) => prev.filter((b) => b._id !== id));
      setOpenSnackbar({ open: true, message: "Beneficiary removed successfully!", severity: "error" });
    } catch (error) {
      console.error("Error removing beneficiary:", error);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    (b.fullname || b.childname).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <WorkerLayout>
      <Container maxWidth="xl" className="mt-3">
        <div className="flex justify-between items-center mb-6">
          <Typography
            variant="h4"
            gutterBottom
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
          >
            Approve Beneficiaries
          </Typography>

          {/* Search bar with icon */}
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Paper elevation={6} className="rounded-xl shadow-xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500">
                  <TableCell className="text-white font-semibold"><User size={16} className="inline mr-2" />Name</TableCell>
                  <TableCell className="text-white font-semibold"><MapPin size={16} className="inline mr-2" />Address</TableCell>
                  <TableCell className="text-white font-semibold"><Phone size={16} className="inline mr-2" />Phone</TableCell>
                  <TableCell className="text-white font-semibold"><Users size={16} className="inline mr-2" />Category</TableCell>
                  <TableCell className="text-white font-semibold"><ShieldCheck size={16} className="inline mr-2" />Status</TableCell>
                  <TableCell className="text-white font-semibold"><CheckCircle size={16} className="inline mr-2" />Approve</TableCell>
                  <TableCell className="text-white font-semibold"><Trash2 size={16} className="inline mr-2" />Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBeneficiaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((beneficiary) => (
                  <TableRow key={beneficiary._id} hover>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBeneficiaries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Snackbar open={openSnackbar.open} autoHideDuration={3000} onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}>
          <Alert severity={openSnackbar.severity} onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}>
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </WorkerLayout>
  );
};

export default ApproveBeneficiaries;
