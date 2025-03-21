import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkerLayout from '../layouts/WorkerLayout';
import { User, CalendarDays, Hash, MapPin, Phone, Mail, ShieldCheck, Users } from 'lucide-react';
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
} from '@mui/material';

const PregLactWomenList = () => {
  const [women, setWomen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchWomen = async () => {
      try {
        const response = await axios.get('http://localhost:5000/beneficiaries/preglactwomen');
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
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold mb-8"
        >
          Pregnant and Lactating Women :
          <p className="mt-3 text-gray-500 mb-4 text-sm">These are the List of all Pregnant women and Lactating women.</p>
        </Typography>

        <Paper elevation={6} className="rounded-xl shadow-xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500">
                  <TableCell className="text-white font-semibold"><User size={16} className="inline mr-2" />Full Name</TableCell>
                  <TableCell className="text-white font-semibold"><CalendarDays size={16} className="inline mr-2" />Delivery Date</TableCell>
                  <TableCell className="text-white font-semibold"><Hash size={16} className="inline mr-2" />Previous Pregnancies</TableCell>
                  <TableCell className="text-white font-semibold"><MapPin size={16} className="inline mr-2" />Address</TableCell>
                  <TableCell className="text-white font-semibold"><Phone size={16} className="inline mr-2" />Phone</TableCell>
                  <TableCell className="text-white font-semibold"><Mail size={16} className="inline mr-2" />Email</TableCell>
                  <TableCell className="text-white font-semibold"><ShieldCheck size={16} className="inline mr-2" />Status</TableCell>
                  <TableCell className="text-white font-semibold"><Users size={16} className="inline mr-2" />Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {women.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((woman) => (
                  <TableRow key={woman._id} hover>
                    <TableCell>{woman.fullname}</TableCell>
                    <TableCell>{new Date(woman.deliveryDate).toLocaleDateString()}</TableCell>
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
            count={women.length}
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

export default PregLactWomenList;
