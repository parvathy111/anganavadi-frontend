import { useEffect, useState } from "react";
import SupervisorLayout from "../layouts/SupervisorLayout";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Trash2 } from "lucide-react";
import api from "../config/axiosinstance";

export default function ViewSupervisorProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/my-products");
      setProducts(response.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/delete/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchQuery.toLowerCase())
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
              My Products
            </Typography>
            <p className="mt-1 text-gray-500 text-sm">
              These are the products you have added.
            </p>
          </div>
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
                  <TableCell className="text-white font-semibold w-10">
                    #
                  </TableCell>
                  <TableCell className="text-white font-semibold w-32">
                    Item ID
                  </TableCell>
                  <TableCell className="text-white font-semibold w-40">
                    Product Name
                  </TableCell>
                  <TableCell className="text-white font-semibold w-40">
                    Image
                  </TableCell>
                  <TableCell className="text-white font-semibold w-20">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => (
                    <TableRow key={product._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{product.itemid}</TableCell>
                      <TableCell>{product.productname}</TableCell>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.productname}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Product"
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
            count={filteredProducts.length}
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
