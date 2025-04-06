import { Close, Info, Login, PersonAdd, VolunteerActivism } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import indeximage from "../assets/index.png";
import aboutimage from "../assets/index1.png";
import LoginComponent from "./Login";
import RegistrationForm from "./RegistrationForm";

// 🍊 Orange Color Theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#f57c00" },      // Deep Orange
    secondary: { main: "#ffcc80" },    // Light Orange
    background: {
      default: "#fff8e1",              // Soft Cream
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
});

const IndexPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
  position="static"
  elevation={3}
  sx={{
    backgroundColor: theme.palette.primary.main,
    paddingY: 1,
  }}
>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    {/* Left side: Icon + Title */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <VolunteerActivism sx={{ color: "white", fontSize: 36, marginRight: 1 }} />
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        CareNest
      </Typography>
    </Box>

    {/* Right side: Navigation buttons */}
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        color="inherit"
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "#ef6c00",
          },
        }}
        startIcon={<Info />}
      >
        About
      </Button>
      <Button
        color="inherit"
        onClick={() => setOpenLogin(true)}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "#ef6c00",
          },
        }}
        startIcon={<Login />}
      >
        Login
      </Button>
      <Button
        color="inherit"
        onClick={() => setOpenRegister(true)}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "#ef6c00",
          },
        }}
        startIcon={<PersonAdd />}
      >
        Register
      </Button>
    </Box>
  </Toolbar>
</AppBar>


      {/* Welcome Section */}
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background:
            "linear-gradient(135deg, #f57c00 0%, #ffb74d 50%, #ffb74d 100%)",
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
            alt="Hero"
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
                Empowering Communities with CareNest
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Typography variant="h6" mt={2}>
                A digital platform designed to support Anganwadi centers and the well-being of children and mothers. Seamless. Efficient. Impactful.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ paddingY: 4 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          About CareNest
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: theme.palette.text.primary, textAlign: "justify" }}
          >
            <strong>CareNest</strong> is a modern web-based system built to enhance the operations of <strong>Anganwadi centers</strong>—an essential part of India’s Integrated Child Development Services (ICDS). These centers provide crucial support to <strong>children under six</strong>, <strong>pregnant women</strong>, and <strong>nursing mothers</strong>.
            <br /><br />
            Our platform helps streamline daily tasks like attendance tracking, nutrition monitoring, educational activities, health updates, and inventory management—creating a smarter, more connected ecosystem for grassroots childcare.
            <br /><br />
            With CareNest, we aim to bridge the gap between traditional practices and digital efficiency—empowering Anganwadi workers, supervisors, and administrators with the tools they need to create real change.
          </Typography>
          <img
            src={aboutimage}
            alt="About Image"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
          />
        </Box>
      </Container>

      {/* Mission Section */}
      <Container sx={{ paddingY: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: theme.palette.text.primary, textAlign: "justify" }}
        >
          At CareNest, our mission is to uplift rural communities by leveraging the power of digital transformation. We believe every child deserves a strong start, and every Anganwadi worker deserves strong support. Our system is built with care, compassion, and cutting-edge technology to make that vision a reality.
        </Typography>
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
