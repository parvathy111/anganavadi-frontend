import { useEffect, useState } from "react";
import SupervisorLayout from "../layouts/SupervisorLayout";
import { MapPin, Trash2 } from "lucide-react";
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
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Note } from "@mui/icons-material";
import api from "../config/axiosinstance";

export default function ViewSupervisorAnganawadi() {
  const [anganwadis, setAnganwadis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchAnganwadis();
  }, []);

  const fetchAnganwadis = async () => {
    try {
      const response = await api.get(
        "/anganavadi/getallanganwadi")
      setAnganwadis(response.data.data || []);
    } catch (err) {
      console.error("Failed to load anganwadis:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Anganwadi?")) return;
  
    try {
      await api.delete(`/anganavadi/deleteanganwadi/${id}`)
  
      setAnganwadis((prev) => prev.filter((center) => center._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete Anganwadi");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAnganwadis = anganwadis.filter((center) =>
    center.anganwadiNo.toLowerCase().includes(searchQuery.toLowerCase())
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
              Anganwadi Centers
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the registered Anganwadi centers.
            </p>
          </div>
          <TextField
            label="Search by Anganwadi No"
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
                <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                  <TableCell className="font-semibold w-10">Sl. No</TableCell>
                  <TableCell className="font-semibold w-32">
                    <Note size={16} className="inline mr-2" />
                    Anganwadi No
                  </TableCell>
                  <TableCell className="font-semibold w-32">
                    <MapPin size={16} className="inline mr-2" />
                    Local Body
                  </TableCell>
                  <TableCell className="font-semibold w-32">Local Body Name</TableCell>
                  <TableCell className="font-semibold w-32">Ward No</TableCell>
                  <TableCell className="font-semibold w-20">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAnganwadis
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((center, index) => (
                    <TableRow key={center._id} hover>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{center.anganwadiNo}</TableCell>
                      <TableCell>{center.localBody}</TableCell>
                      <TableCell>{center.localBodyName}</TableCell>
                      <TableCell>{center.wardNumber}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDelete(center._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Anganwadi"
                        >
                          <Trash2 size={18} color="red" />
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
            count={filteredAnganwadis.length}
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
