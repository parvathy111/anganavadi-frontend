import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Paper,
  Alert,
  Box,
  Divider,
  Pagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import {
  LocalHospital,
  Vaccines,
  People,
  CalendarToday,
  Assignment,
  ArrowBack,
  Print,
} from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import api from "../config/axiosinstance";
import WorkerLayout from "../layouts/WorkerLayout";

const VaccineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const response = await api.get(`/vaccines/${id}`);
        setVaccine(response.data);
      } catch (error) {
        console.error("Error fetching vaccine detail:", error);
        setError("Vaccine not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchVaccine();
  }, [id]);

  console.log(vaccine);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedPersons = vaccine?.completedPersons?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(
    (vaccine?.completedPersons?.length || 0) / itemsPerPage
  );

  return (
    <WorkerLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 1 } }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <Box>
            {/* Header with Back and Print buttons */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              className="no-print"
            >
              <Typography
                variant="h4"
                sx={{
                  color: orange[600],
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Vaccines /> Vaccine Information
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: orange[600],
                    "&:hover": { backgroundColor: orange[700] },
                  }}
                  onClick={() => navigate(-1)}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: orange[600],
                    "&:hover": { backgroundColor: orange[700] },
                  }}
                  startIcon={<Print />}
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </Stack>
            </Stack>

            {/* Printable content */}
            <Box className="printable">
              {/* Vaccine Info - Responsive Grid */}
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<Vaccines />}
                    label="Vaccine Name"
                    value={vaccine.vaccine}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<Assignment />}
                    label="Stage"
                    value={vaccine.stage}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<People />}
                    label="Dose"
                    value={vaccine.dose}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<LocalHospital />}
                    label="Vaccinator"
                    value={vaccine.vaccinator}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<People />}
                    label="Role"
                    value={vaccine.vaccineeRole}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DetailItem
                    icon={<CalendarToday />}
                    label="Last Date"
                    value={new Date(vaccine.lastDate).toLocaleDateString()}
                  />
                </Grid>
              </Grid>

              {/* Completed Persons Section */}
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: orange[600],
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <People /> Completed Persons (
                  {vaccine.completedPersons?.length || 0})
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {vaccine.completedPersons &&
                vaccine.completedPersons.length > 0 ? (
                  <Box>
                    <Box sx={{ overflowX: "auto" }}>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="completed persons table"
                      >
                        <TableHead>
                          <TableRow sx={{ backgroundColor: orange[100] }}>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Phone
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Role
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Vaccinated On
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedPersons.map((person, index) => (
                            <TableRow
                              key={index}
                              hover
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </TableCell>
                              <TableCell>
                                {person.role === "parent"
                                  ? person.childname
                                  : person.fullname}
                              </TableCell>
                              <TableCell>{person.email}</TableCell>
                              <TableCell>{person.phone}</TableCell>
                              <TableCell sx={{ fontStyle: "italic" }}>
                                {person.role}
                              </TableCell>
                              <TableCell>
                              {new Date(person.updatedAt).toLocaleDateString('en-GB')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>

                    {/* Pagination - hidden in print */}
                    {totalPages > 1 && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        mt={1}
                        className="no-print"
                      >
                        <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handlePageChange}
                          color="#"
                          showFirstButton
                          showLastButton
                        />
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", textAlign: "center", py: 3 }}
                  >
                    No one has completed this vaccine yet.
                  </Typography>
                )}
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </WorkerLayout>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      p: 2,
      backgroundColor: "background.paper",
      borderRadius: 1,
      boxShadow: 1,
      height: "100%",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Box sx={{ color: orange[600] }}>{icon}</Box>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
    </Box>
    <Typography
      variant="body1"
      sx={{ fontWeight: "medium", wordBreak: "break-word" }}
    >
      {value}
    </Typography>
  </Box>
);

export default VaccineDetail;
