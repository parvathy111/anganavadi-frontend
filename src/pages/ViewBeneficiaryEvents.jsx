import React, { useEffect, useState } from "react";
import BeneficiaryLayout from "../layouts/BeneficiaryLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import api from "../config/axiosinstance";

const ViewBeneficiaryEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events/beneficiary-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_, newPage) => {
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
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Anganwadi Events
            </Typography>
            <p className="text-sm text-gray-500">Events you are eligible to attend</p>
          </div>

          <TextField
            label="Search Event"
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
                  <TableCell className="text-white font-semibold">#</TableCell>
                  <TableCell className="text-white font-semibold">
                    <EventIcon fontSize="small" className="mr-1" />
                    Event Name
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <GroupIcon fontSize="small" className="mr-1" />
                    Participants
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <AccessTimeIcon fontSize="small" className="mr-1" />
                    Date & Time
                  </TableCell>
                  <TableCell className="text-white font-semibold">Status</TableCell>
                  <TableCell className="text-white font-semibold">Conducted By</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredEvents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event, index) => (
                    <TableRow key={event._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>{event.participantType}</TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </TableCell>
                      <TableCell>{event.status}</TableCell>
                      <TableCell>{event.conductedBy}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEvents.length}
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

export default ViewBeneficiaryEvents;
