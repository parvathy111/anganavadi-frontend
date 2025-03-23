import { useEffect, useState } from "react";
import axios from "axios";
import SupervisorLayout from "../layouts/SupervisorLayout";
import { MapPin } from "lucide-react";
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
import { Note } from "@mui/icons-material";

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
      const response = await axios.get(
        "http://localhost:5000/anganavadi/getallanganwadi",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAnganwadis(response.data.data || []);
    } catch (err) {
      console.error("Failed to load anganwadis:", err);
    } finally {
      setLoading(false);
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
            label="Search by Number"
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
                    <Note size={16} className="inline mr-2" />
                    Anganwadi No
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <MapPin size={16} className="inline mr-2" />
                    Local Body
                  </TableCell>
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
