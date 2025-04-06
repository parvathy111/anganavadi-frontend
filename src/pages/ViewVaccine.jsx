import React, { useEffect, useState } from "react";
import WorkerLayout from "../layouts/WorkerLayout";
import {
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Syringe, CalendarDays, User, Shield } from "lucide-react";
import api from "../config/axiosinstance";

const ViewVaccine = ({ userRole }) => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editVaccineData, setEditVaccineData] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await api.get("/vaccines/");
        let filteredVaccines = response.data;

        if (userRole !== "Worker") {
          filteredVaccines = filteredVaccines.filter(
            (vaccine) => vaccine.vaccineeRole === userRole
          );
        }

        setVaccines(filteredVaccines);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
        showNotification(
          error.response?.data?.message || "Failed to fetch vaccines",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVaccines();
  }, [userRole]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      try {
        await api.delete(`/vaccines/delete/${id}`);
        setVaccines(vaccines.filter((vaccine) => vaccine._id !== id));
        showNotification("Vaccine deleted successfully!");
      } catch (error) {
        console.error("Error deleting vaccine:", error);
        showNotification(
          error.response?.data?.message || "Failed to delete vaccine",
          "error"
        );
      }
    }
  };

  const handleEdit = (vaccine) => {
    setEditVaccineData(vaccine);
    setOpenEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditVaccineData({ ...editVaccineData, [name]: value });
  };

  const handleUpdateVaccine = async () => {
    try {
      await api.put(`/vaccines/${editVaccineData._id}`, editVaccineData);
      setVaccines(
        vaccines.map((vaccine) =>
          vaccine._id === editVaccineData._id ? editVaccineData : vaccine
        )
      );
      setOpenEditModal(false);
      showNotification("Vaccine updated successfully!");
    } catch (error) {
      console.error("Error updating vaccine:", error);
      showNotification(
        error.response?.data?.message || "Failed to update vaccine. Please try again.",
        "error"
      );
    }
  };

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setNotification({ ...notification, open: false });
  };

  const filteredVaccines = vaccines.filter((vaccine) =>
    Object.values(vaccine).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <WorkerLayout>
      <div className="p-6">
        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={notification.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Vaccine Records
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the registered vaccine records.
            </p>
          </div>
          <TextField
            label="Search Vaccines"
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
                  <TableCell className="text-white font-semibold">
                    <Syringe size={16} className="inline mr-2" />
                    Vaccine
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Stage
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Dose
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <User size={16} className="inline mr-2" />
                    Vaccinator
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Shield size={16} className="inline mr-2" />
                    Role
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <CalendarDays size={16} className="inline mr-2" />
                    Last Date
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVaccines
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((vaccine) => (
                    <TableRow key={vaccine._id} hover>
                      <TableCell>{vaccine.vaccine}</TableCell>
                      <TableCell>{vaccine.stage}</TableCell>
                      <TableCell>{vaccine.dose}</TableCell>
                      <TableCell>{vaccine.vaccinator}</TableCell>
                      <TableCell>{vaccine.vaccineeRole}</TableCell>
                      <TableCell>
                        {new Date(vaccine.lastDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleEdit(vaccine)} 
                          color="primary"
                          size="small"
                          className="mr-1"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(vaccine._id)} 
                          color="error"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredVaccines.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Edit Vaccine Dialog */}
        <Dialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            Edit Vaccine Record
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} className="mt-4">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Vaccine Name"
                  name="vaccine"
                  value={editVaccineData?.vaccine || ""}
                  onChange={handleEditInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stage"
                  name="stage"
                  value={editVaccineData?.stage || ""}
                  onChange={handleEditInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dose"
                  name="dose"
                  value={editVaccineData?.dose || ""}
                  onChange={handleEditInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Vaccinator"
                  name="vaccinator"
                  value={editVaccineData?.vaccinator || ""}
                  onChange={handleEditInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  name="vaccineeRole"
                  value={editVaccineData?.vaccineeRole || ""}
                  onChange={handleEditInputChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Date"
                  type="date"
                  name="lastDate"
                  value={editVaccineData?.lastDate?.split('T')[0] || ""}
                  onChange={handleEditInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenEditModal(false)}
              
              color="primary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateVaccine} 
              color="primary"
              variant="contained"
              className="bg-gradient-to-r from-orange-500 to-orange-600"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </WorkerLayout>
  );
};

export default ViewVaccine;