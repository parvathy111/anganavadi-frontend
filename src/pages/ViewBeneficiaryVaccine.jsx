import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DateRangeIcon from "@mui/icons-material/DateRange";
import api from "../config/axiosinstance";
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";

const ViewBeneficiaryVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await api.get("/vaccines/getvaccine");
        setVaccines(response.data || []);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.vaccine.toLowerCase().includes(searchQuery.toLowerCase())
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
    <BeneficiaryLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Vaccine Details
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the vaccines available for you.
            </p>
          </div>
          <TextField
            label="Search by Vaccine"
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
                  <TableCell className="text-white font-semibold w-40">
                    <VaccinesIcon fontSize="small" className="mr-1" />
                    Vaccine
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <AccessTimeIcon fontSize="small" className="mr-1" />
                    Stage
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <PersonIcon fontSize="small" className="mr-1" />
                    Dose
                  </TableCell>
                  <TableCell className="text-white font-semibold w-40">
                    <LocalHospitalIcon fontSize="small" className="mr-1" />
                    Vaccinator
                  </TableCell>
                  <TableCell className="text-white font-semibold w-40">
                    <DateRangeIcon fontSize="small" className="mr-1" />
                    Last Date
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
                      <TableCell>
                        {new Date(vaccine.lastDate).toLocaleDateString()}
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
      </div>
    </BeneficiaryLayout>
  );
};

export default ViewBeneficiaryVaccine;
