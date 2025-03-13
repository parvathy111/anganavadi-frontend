import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

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

  // Handle search filter
  const filteredVaccines = vaccines.filter((vaccine) =>
    Object.values(vaccine).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) return <CircularProgress className="m-auto mt-10" />;

  return (
    <div className="p-6 flex flex-col items-center">
      <Typography variant="h4" className="mb-4 font-bold">
        Vaccine List
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Vaccine"
        variant="outlined"
        fullWidth
        className="mb-4 max-w-md"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredVaccines.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No vaccines available.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          className="shadow-lg rounded-lg overflow-hidden"
        >
          <Table>
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell className="font-bold">#</TableCell>
                <TableCell className="font-bold">Vaccine Name</TableCell>
                <TableCell className="font-bold">Stage</TableCell>
                <TableCell className="font-bold">Dose</TableCell>
                <TableCell className="font-bold">Vaccinator</TableCell>
                <TableCell className="font-bold">Role</TableCell>
                <TableCell className="font-bold">Last Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVaccines.map((vaccine, index) => (
                <TableRow key={vaccine._id} className="hover:bg-gray-100">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{vaccine.vaccine}</TableCell>
                  <TableCell>{vaccine.stage}</TableCell>
                  <TableCell>{vaccine.dose}</TableCell>
                  <TableCell>{vaccine.vaccinator}</TableCell>
                  <TableCell>{vaccine.vaccineeRole}</TableCell>
                  <TableCell>
                    {new Date(vaccine.lastDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewVaccine;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// import {
//   CircularProgress,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
// } from "@mui/material";

// const ViewVaccine = ({ userRole }) => {
//   const [vaccines, setVaccines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     const fetchVaccines = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/vaccines");
//         let filteredVaccines = response.data;

//         if (userRole !== "Worker") {
//           filteredVaccines = filteredVaccines.filter(
//             (vaccine) => vaccine.vaccineeRole === userRole
//           );
//         }

//         setVaccines(filteredVaccines);
//       } catch (error) {
//         console.error("Error fetching vaccines:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVaccines();
//   }, [userRole]);

//   // Handle search filter
//   const filteredVaccines = vaccines.filter((vaccine) =>
//     Object.values(vaccine).some((value) =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   if (loading) return <CircularProgress className="m-auto mt-10" />;

//   return (
//     <div className="p-6 flex flex-col items-center">
//       <Typography variant="h4" className="mb-4 font-bold">
//         Vaccine List
//       </Typography>

//       {/* Search Bar */}
//       <TextField
//         label="Search Vaccine"
//         variant="outlined"
//         fullWidth
//         className="mb-4 max-w-md"
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {filteredVaccines.length === 0 ? (
//         <Typography variant="h6" color="textSecondary">
//           No vaccines available.
//         </Typography>
//       ) : (
//         <TableContainer
//           component={Paper}
//           className="shadow-lg rounded-lg overflow-hidden"
//         >
//           <Table>
//             <TableHead className="bg-gray-200">
//               <TableRow>
//                 <TableCell className="font-bold">#</TableCell>
//                 <TableCell className="font-bold">Vaccine Name</TableCell>
//                 <TableCell className="font-bold">Stage</TableCell>
//                 <TableCell className="font-bold">Dose</TableCell>
//                 <TableCell className="font-bold">Vaccinator</TableCell>
//                 <TableCell className="font-bold">Role</TableCell>
//                 <TableCell className="font-bold">Last Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredVaccines.map((vaccine, index) => (
//                 <TableRow
//                   key={vaccine._id}
//                   className="hover:bg-gray-100 cursor-pointer"
//                   onClick={() => navigate(`/vaccine/${vaccine._id}`)} // Redirect to details page
//                 >
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{vaccine.vaccine}</TableCell>
//                   <TableCell>{vaccine.stage}</TableCell>
//                   <TableCell>{vaccine.dose}</TableCell>
//                   <TableCell>{vaccine.vaccinator}</TableCell>
//                   <TableCell>{vaccine.vaccineeRole}</TableCell>
//                   <TableCell>
//                     {new Date(vaccine.lastDate).toLocaleDateString()}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default ViewVaccine;
