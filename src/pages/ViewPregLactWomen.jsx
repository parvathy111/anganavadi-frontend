import React, { useEffect, useState } from 'react';
import WorkerLayout from '../layouts/WorkerLayout';
import {
  User,
  CalendarDays,
  Hash,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Users,
} from 'lucide-react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../config/axiosinstance';

const PregLactWomenList = () => {
  const [women, setWomen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWomen = async () => {
      try {
        const response = await api.get('/beneficiaries/preglactwomen');
        setWomen(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWomen();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredWomen = women.filter((woman) =>
    woman.fullname.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Pregnant and Lactating Women :
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the List of all Pregnant women and Lactating women.
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
          {filteredWomen.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              className="text-gray-600 py-10"
            >
              No data available.
            </Typography>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500">
                      <TableCell className="text-white font-semibold">
                        <User size={16} className="inline mr-2" />
                        Full Name
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <CalendarDays size={16} className="inline mr-2" />
                        Delivery Date
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <Hash size={16} className="inline mr-2" />
                        Previous Pregnancies
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <MapPin size={16} className="inline mr-2" />
                        Address
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <Phone size={16} className="inline mr-2" />
                        Phone
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <ShieldCheck size={16} className="inline mr-2" />
                        Status
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        <Users size={16} className="inline mr-2" />
                        Role
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredWomen
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((woman) => (
                        <TableRow key={woman._id} hover>
                          <TableCell>{woman.fullname}</TableCell>
                          <TableCell>
                            {new Date(woman.deliveryDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{woman.prevNumPreg}</TableCell>
                          <TableCell>{woman.address}</TableCell>
                          <TableCell>{woman.phone}</TableCell>
                          <TableCell>{woman.email}</TableCell>
                          <TableCell>{woman.status}</TableCell>
                          <TableCell>{woman.role}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredWomen.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </div>
    </WorkerLayout>
  );
};

export default PregLactWomenList;
