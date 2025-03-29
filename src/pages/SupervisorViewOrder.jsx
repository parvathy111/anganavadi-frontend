import React, { useEffect, useState } from "react";
import SupervisorLayout from "../layouts/SupervisorLayout";
import {
  CheckCircle,
  XCircle,
  ShoppingBag,
  Calendar,
  Warehouse,
} from "lucide-react";
import {
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  TextField,
  TablePagination,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SupervisorViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored in localStorage
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: Expected an array");
      }

      const sortedData = data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrders(sortedData);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/orders/approve/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "Approved" } : o
        )
      );

      setOpenSnackbar({
        open: true,
        message: "Order approved successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Error approving order:", err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/orders/reject/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "Rejected" } : o
        )
      );

      setOpenSnackbar({
        open: true,
        message: "Order rejected successfully!",
        severity: "error",
      });
    } catch (err) {
      console.error("Error rejecting order:", err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    (order.productname || "").toLowerCase().includes(searchQuery.toLowerCase())
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
    <SupervisorLayout>
      <Container maxWidth="xl" className="mt-3">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography
              variant="h4"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              View Orders
            </Typography>
            <p className="text-gray-600 mb-2">
              Here you can review, approve, or reject stock orders from various
              Anganwadi centers.
            </p>
          </div>

          {/* Search bar */}
          <TextField
            label="Search by Product Name"
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
                    <ShoppingBag size={16} className="inline mr-2" />
                    Product
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Quantity
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Warehouse size={16} className="inline mr-2" />
                    Anganwadi No
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    <Calendar size={16} className="inline mr-2" />
                    Order Date
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Status
                  </TableCell>
                  <TableCell className="text-white font-semibold">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order._id} hover>
                      <TableCell>{order.productname}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.anganwadiNo}</TableCell>
                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded-md ${
                            order.orderStatus === "Approved"
                              ? "bg-green-200 text-green-700"
                              : order.orderStatus === "Rejected"
                              ? "bg-red-200 text-red-700"
                              : "bg-yellow-200 text-yellow-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        {order.orderStatus === "Pending" && (
                          <div className="flex gap-2">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleApprove(order._id)}
                              startIcon={<CheckCircle size={16} />}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleReject(order._id)}
                              startIcon={<XCircle size={16} />}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {order.orderStatus === "Approved" && (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleReject(order._id)}
                            startIcon={<XCircle size={16} />}
                          >
                            Reject
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={openSnackbar.severity}
            onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </SupervisorLayout>
  );
};

export default SupervisorViewOrder;
