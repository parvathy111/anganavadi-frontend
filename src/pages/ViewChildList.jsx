import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkerLayout from '../layouts/WorkerLayout';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Typography
} from '@mui/material';
import { User, CalendarDays, MapPin, Phone, Mail, ShieldCheck, Users } from 'lucide-react';

const ParentList = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/beneficiaries/parents'); 
        setParents(response.data);
      } catch (error) {
        console.error('Error fetching parents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
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
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-extrabold mb-2"
        >
          Children's Records :
        </Typography>
        <p className="mt-2 text-gray-600 mb-5 text-sm text-left">
          These are the list of all registered Parents.
        </p>

        <Paper elevation={6} className="rounded-xl shadow-xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gradient-to-r from-orange-400 to-orange-500">
                  <TableCell className="text-white font-semibold"><User size={16} className="inline mr-2" />Child Name</TableCell>
                  <TableCell className="text-white font-semibold"><CalendarDays size={16} className="inline mr-2" />Date of Birth</TableCell>
                  <TableCell className="text-white font-semibold"><Users size={16} className="inline mr-2" />Gender</TableCell>
                  <TableCell className="text-white font-semibold"><User size={16} className="inline mr-2" />Father's Name</TableCell>
                  <TableCell className="text-white font-semibold"><User size={16} className="inline mr-2" />Mother's Name</TableCell>
                  <TableCell className="text-white font-semibold"><MapPin size={16} className="inline mr-2" />Address</TableCell>
                  <TableCell className="text-white font-semibold"><Phone size={16} className="inline mr-2" />Phone</TableCell>
                  <TableCell className="text-white font-semibold"><Mail size={16} className="inline mr-2" />Email</TableCell>
                  <TableCell className="text-white font-semibold"><ShieldCheck size={16} className="inline mr-2" />Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((parent) => (
                  <TableRow key={parent._id} hover>
                    <TableCell>{parent.childname}</TableCell>
                    <TableCell>{new Date(parent.dob).toLocaleDateString()}</TableCell>
                    <TableCell>{parent.gender}</TableCell>
                    <TableCell>{parent.fathername}</TableCell>
                    <TableCell>{parent.mothername}</TableCell>
                    <TableCell>{parent.address}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={parents.length}
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

export default ParentList;
