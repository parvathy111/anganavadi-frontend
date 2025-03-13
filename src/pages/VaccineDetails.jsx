import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Typography, Card, CardContent } from "@mui/material";

const VaccineDetails = () => {
  const { id } = useParams(); // Get vaccine ID from URL
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccineDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/vaccines/${id}`);
        setVaccine(response.data);
      } catch (error) {
        console.error("Error fetching vaccine details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccineDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/vaccines/${id}`);
      navigate("/vaccines"); // Redirect back to vaccine list after deletion
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
  };

  if (loading) return <CircularProgress className="m-auto mt-10" />;

  if (!vaccine) return <Typography className="text-center mt-10">Vaccine not found</Typography>;

  return (
    <div className="p-6 flex flex-col items-center">
      <Typography variant="h4" className="mb-4 font-bold">
        Vaccine Details
      </Typography>

      <Card className="shadow-lg w-full max-w-md">
        <CardContent>
          <Typography variant="h5" className="font-semibold">
            {vaccine.vaccine}
          </Typography>
          <Typography>Stage: {vaccine.stage}</Typography>
          <Typography>Dose: {vaccine.dose}</Typography>
          <Typography>Vaccinator: {vaccine.vaccinator}</Typography>
          <Typography>Role: {vaccine.vaccineeRole}</Typography>
          <Typography>
            Last Date: {new Date(vaccine.lastDate).toLocaleDateString()}
          </Typography>
          <Typography>
            Completed Persons: {vaccine.completedPersons || "Not available"}
          </Typography>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit-vaccine/${id}`)}
            >
              Edit Vaccine
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Remove Vaccine
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccineDetails;
