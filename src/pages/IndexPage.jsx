import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Info, Login, PersonAdd, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import indeximage from "../assets/index.png";
import aboutimage from "../assets/index1.png";
import LoginComponent from "./Login";
import RegistrationForm from "./RegistrationForm"; // Import Registration Form

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ff9800" }, // Orange
    secondary: { main: "#f48fb1" }, // Pink
    background: { default: "#ffeb3b" }, // Yellow
  },
});

const IndexPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false); // Register popup state

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: "#ef9a9a" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: "white" }}>
            CareNest
          </Typography>
          <Button color="inherit" sx={{ color: "white" }} startIcon={<Info />}>
            About
          </Button>
          <Button
            color="inherit"
            startIcon={<Login />}
            onClick={() => setOpenLogin(true)}
            sx={{ color: "white" }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            startIcon={<PersonAdd />}
            onClick={() => setOpenRegister(true)} // Open Register Popup
            sx={{ color: "white" }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #ff9800 0%, #f48fb1 50%, #ffeb3b 100%)",
          color: "white",
          padding: 4,
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={indeximage}
            alt="Hero Image"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <Box sx={{ marginLeft: "60px", marginTop: "10px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h3" fontWeight="bold" m="10px">
                Welcome to My App
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Typography variant="h6" mt={2}>
                Experience a seamless and engaging platform.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container sx={{ paddingY: 4, textAlign: "left" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom color="#ec407a">
          About
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" color="black" paragraph>
            This is a modern web application built with React, Vite, Material
            UI, and Tailwind CSS. It provides a stylish and efficient user
            interface for managing various tasks efficiently.
          </Typography>
          <img
            src={aboutimage}
            alt="About Image"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
          />
        </Box>
      </Container>

      {/* Login Popup */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setOpenLogin(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
          <LoginComponent />
        </DialogContent>
      </Dialog>

      {/* Register Popup */}
      <Dialog
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => setOpenRegister(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default IndexPage;
