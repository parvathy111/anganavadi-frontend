// import { useState } from "react";
// import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";

// const Adminlogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     console.log("Username:", username);
//     console.log("Password:", password);

//     // Add authentication logic here
//   };
  

//   return (
//     <Container maxWidth="xs">
//       <Paper elevation={3} sx={{ padding: 3, marginTop: 8, textAlign: "center" }}>
//         <Typography variant="h5" gutterBottom>
//           Admin Login
//         </Typography>
//         <Box component="form" noValidate autoComplete="off">
//           <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 2 }}
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Adminlogin;


import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";

const Adminlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });

      if (res.status === 200) {
        console.log("Login successful:", res.data);
      } else {
        console.log("Login failed: Unexpected response");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Adminlogin;
