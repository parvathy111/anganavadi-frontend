import { useEffect, useState } from "react";
import WorkerLayout from "../layouts/WorkerLayout";
import { Package, Hash, Image as ImageIcon, Edit } from "lucide-react";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../config/axiosinstance";

export default function WorkerAvailableStock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editItem, setEditItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [lowStockWarning, setLowStockWarning] = useState("");

  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    const lowStockItems = stock.filter((item) => item.quantity < 5);
    if (lowStockItems.length > 0) {
      const lowStockNames = lowStockItems.map((item) => item.name).join(", ");
      setLowStockWarning(`⚠️ Low stock warning! The following items have less than 5 units: ${lowStockNames}`);
    } else {
      setLowStockWarning("");
    }
  }, [stock]);

  const fetchStock = async () => {
    try {
    
      const response = await api.get("/worker-available-stock/available-stock");
    
      setStock(response.data);
    
    } catch (err) {
      console.error("Failed to fetch stock:", err);
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

  const filteredStock = stock.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (item) => {
    setEditItem(item);
    setNewQuantity(item.quantity);
  };

  const handleCloseEdit = () => {
    setEditItem(null);
    setNewQuantity("");
  };

  const handleUpdateQuantity = async () => {
    if (!editItem || newQuantity < 0) return;

    try {
      await api.put(
        `/worker-available-stock/update-stock/${editItem._id}`,
        { quantity: newQuantity }
      );

      setStock((prevStock) =>
        prevStock.map((item) =>
          item._id === editItem._id ? { ...item, quantity: newQuantity } : item
        )
      );

      handleCloseEdit();
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
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
      <div className="p-2">
        {lowStockWarning && (
          <Typography variant="body1" className="text-red-600 font-semibold mb-4">
            {lowStockWarning}
          </Typography>
        )}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-bold"
            >
              Available Stock
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the available stock items for your Anganwadi.
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
                    <Hash size={16} className="inline mr-2" />
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <Package size={16} className="inline mr-2" /> Product Name
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    <Hash size={16} className="inline mr-2" /> Quantity (Kg)
                  </TableCell>
                  <TableCell className="text-white font-semibold w-42">
                    <ImageIcon size={16} className="inline mr-2" /> Image
                  </TableCell>
                  <TableCell className="text-white font-semibold w-20">Update quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStock.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {item.image ? <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" /> : "No Image"}
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleEditClick(item)}>
                        <Edit size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredStock.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

       {/* ✅ Enhanced Edit Quantity Modal */}
<Dialog open={!!editItem} onClose={handleCloseEdit} fullWidth maxWidth="sm">
  <DialogTitle className="bg-orange-500 text-white font-semibold text-lg text-center">
    Update Quantity
  </DialogTitle>
  <DialogContent className="p-6 space-y-4">
    <p className="text-gray-700 text-sm text-center">
      Adjust the quantity for <strong>{editItem?.name}</strong>.
    </p>
    <TextField
      type="number"
      label="New Quantity"
      variant="outlined"
      fullWidth
      value={newQuantity}
      onChange={(e) => setNewQuantity(e.target.value)}
      className="rounded-lg"
      InputProps={{
        style: { borderRadius: "8px", padding: "10px" },
      }}
    />
  </DialogContent>
  <DialogActions className="p-4 flex justify-center space-x-4">
    <Button
      onClick={handleCloseEdit}
      // variant="contained"
      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
    >
      Cancel
    </Button>
    <Button
      onClick={handleUpdateQuantity}
      variant="contained"
      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
    >
      Update
    </Button>
  </DialogActions>
</Dialog>


      </div>
    </WorkerLayout>
  );
}
