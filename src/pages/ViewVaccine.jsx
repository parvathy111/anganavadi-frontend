import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Syringe,
  Hash,
  ShieldPlus,
  Layers,
  Droplet,
  UserCheck,
  Users,
  CalendarDays,
} from "lucide-react";
import WorkerLayout from "../layouts/WorkerLayout";

const ViewVaccine = ({ userRole }) => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/vaccines");
        let filteredVaccines = response.data;

        if (userRole !== "Worker") {
          filteredVaccines = filteredVaccines.filter(
            (vaccine) => vaccine.vaccineeRole === userRole
          );
        }

        setVaccines(filteredVaccines);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVaccines();
  }, [userRole]);

  const filteredVaccines = vaccines.filter((vaccine) =>
    Object.values(vaccine).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <WorkerLayout>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Header */}
          <Box display="flex" mt={5} alignItems="center" justifyContent="center" mb={3}>
            <Syringe size={32} color="#ff7043" />
            <Typography variant="h4" ml={1} fontWeight="bold" color="#ff7043">
              Vaccine List
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box display="flex" justifyContent="center" mb={4}>
            <TextField
              label="Search Vaccine"
              variant="outlined"
              sx={{ width: "400px" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Vaccine Table */}
          {filteredVaccines.length > 0 ? (
            <div className="mt-6 overflow-x-auto px-6 pb-6">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                    <th className="py-3 px-4 text-left">
                      <Hash size={16} className="inline-block mr-1" /> #
                    </th>
                    <th className="py-3 px-4 text-left">
                      <ShieldPlus size={16} className="inline-block mr-1" /> Vaccine
                    </th>
                    <th className="py-3 px-4 text-left">
                      <Layers size={16} className="inline-block mr-1" /> Stage
                    </th>
                    <th className="py-3 px-4 text-left">
                      <Droplet size={16} className="inline-block mr-1" /> Dose
                    </th>
                    <th className="py-3 px-4 text-left">
                      <UserCheck size={16} className="inline-block mr-1" /> Vaccinator
                    </th>
                    <th className="py-3 px-4 text-left">
                      <Users size={16} className="inline-block mr-1" /> Role
                    </th>
                    <th className="py-3 px-4 text-left">
                      <CalendarDays size={16} className="inline-block mr-1" /> Last Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVaccines.map((vaccine, index) => (
                    <tr key={vaccine._id} className="hover:bg-orange-50">
                      <td className="py-2 px-4 font-semibold">{index + 1}</td>
                      <td className="py-2 px-4">{vaccine.vaccine}</td>
                      <td className="py-2 px-4">{vaccine.stage}</td>
                      <td className="py-2 px-4">{vaccine.dose}</td>
                      <td className="py-2 px-4">{vaccine.vaccinator}</td>
                      <td className="py-2 px-4">{vaccine.vaccineeRole}</td>
                      <td className="py-2 px-4">
                        {new Date(vaccine.lastDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
            >
              No vaccines available.
            </Typography>
          )}
        </Box>
      )}
    </WorkerLayout>
  );
};

export default ViewVaccine;
