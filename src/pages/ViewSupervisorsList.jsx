import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Trash2,
} from "lucide-react";
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

export default function ViewSupervisorsList() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/supervisor/viewsupervisors"
      );
      setSupervisors(response.data.supervisors || []);
    } catch (err) {
      console.error("Failed to load supervisors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supervisor?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/supervisor/delete/${id}`);
      setSupervisors((prev) => prev.filter((sup) => sup._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete supervisor");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSupervisors = supervisors.filter((sup) =>
    sup.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Supervisors List
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the registered supervisors under your system.
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
                    <MapPin size={16} className="inline mr-2" />
                    Local Body
                  </TableCell>
                  <TableCell className="text-white font-semibold w-42">
                    <Home size={16} className="inline mr-2" />
                    Address
                  </TableCell>
                  <TableCell className="text-white font-semibold w-30">
                    <Phone size={16} className="inline mr-2" />
                    Phone
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </TableCell>
                  <TableCell className="text-white font-semibold w-20">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSupervisors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sup, index) => (
                    <TableRow key={sup._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{sup.fullname}</TableCell>
                      <TableCell>{sup.localBody}</TableCell>
                      <TableCell>{sup.address}</TableCell>
                      <TableCell>{sup.phone}</TableCell>
                      <TableCell>{sup.email}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(sup._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Supervisor"
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
            count={filteredSupervisors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </AdminLayout>
  );
}
