import { useEffect, useState } from "react";
import axios from "axios";
import SupervisorLayout from "../layouts/SupervisorLayout";
import { User, Phone, Mail, MapPin, CalendarDays, Home } from "lucide-react";
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
import { Trash2 } from "lucide-react";

export default function ViewWorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/worker/allworkers"
      );
      setWorkers(response.data || []);
    } catch (err) {
      console.error("Failed to load workers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      await axios.delete(`http://localhost:5000/worker/delete/${id}`);
      setWorkers((prev) => prev.filter((worker) => worker._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete worker");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <SupervisorLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Anganwadi Workers
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the registered Anganwadi workers.
            </p>
          </div>
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
                  <TableCell className="text-white font-semibold w-10">
                    #
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <User size={16} className="inline mr-2" />
                    Name
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </TableCell>
                  <TableCell className="text-white font-semibold w-30">
                    <Phone size={16} className="inline mr-2" />
                    Phone
                  </TableCell>
                  <TableCell className="text-white font-semibold w-42">
                    <MapPin size={16} className="inline mr-2" />
                    Anganwadi No
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <User size={16} className="inline mr-2" />
                    Gender
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <CalendarDays size={16} className="inline mr-2" />
                    DOB
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <Home size={16} className="inline mr-2" />
                    Address
                  </TableCell>
                  <TableCell className="text-white font-semibold w-20">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredWorkers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((worker, index) => (
                    <TableRow key={worker._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{worker.name}</TableCell>
                      <TableCell>{worker.email}</TableCell>
                      <TableCell>{worker.phone}</TableCell>
                      <TableCell>{worker.anganwadiNo}</TableCell>
                      <TableCell>{worker.gender}</TableCell>
                      <TableCell>
                        {new Date(worker.dob).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{worker.address}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(worker._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Worker"
                        >
                          <Trash2 size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredWorkers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </SupervisorLayout>
  );
}
