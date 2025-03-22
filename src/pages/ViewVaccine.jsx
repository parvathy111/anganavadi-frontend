import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import { Syringe, Hash, ShieldPlus, Layers, Droplet, UserCheck, Users, CalendarDays } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";

const ViewVaccine = ({ userRole }) => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/vaccines");
        let filteredVaccines = response.data;

        if (userRole !== "Worker") {
          filteredVaccines = filteredVaccines.filter(
            (vaccine) => vaccine.vaccineeRole === userRole
          );
        }

        setVaccines(filteredVaccines);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography
              variant="h4"
              align="left"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-extrabold mb-2"
            >
              Vaccine List:
            </Typography>
            <p className="mt-2 text-gray-600 text-sm text-left">
              Here is the list of vaccines available for different roles.
            </p>
          </div>
          {/* Search bar */}
          <TextField
            label="Search Vaccine"
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
                    <Hash size={16} className="inline mr-2" /> #
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <ShieldPlus size={16} className="inline mr-2" /> Vaccine
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Layers size={16} className="inline mr-2" /> Stage
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Droplet size={16} className="inline mr-2" /> Dose
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <UserCheck size={16} className="inline mr-2" /> Vaccinator
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Users size={16} className="inline mr-2" /> Role
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <CalendarDays size={16} className="inline mr-2" /> Last Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVaccines
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((vaccine, index) => (
                    <TableRow key={vaccine._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{vaccine.vaccine}</TableCell>
                      <TableCell>{vaccine.stage}</TableCell>
                      <TableCell>{vaccine.dose}</TableCell>
                      <TableCell>{vaccine.vaccinator}</TableCell>
                      <TableCell>{vaccine.vaccineeRole}</TableCell>
                      <TableCell>{new Date(vaccine.lastDate).toLocaleDateString()}</TableCell>
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
      </div>
    </WorkerLayout>
  );
};

export default ViewVaccine;
