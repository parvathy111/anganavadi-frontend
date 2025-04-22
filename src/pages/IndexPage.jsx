import {
  Close,
  Info,
  Login,
  PersonAdd,
  VolunteerActivism,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
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
    primary: { main: "#f57c00" }, // Deep Orange
    secondary: { main: "#ffcc80" }, // Light Orange
    background: {
      default: "#fff8e1", // Soft Cream
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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
            <VolunteerActivism
              sx={{ color: "white", fontSize: 36, marginRight: 1 }}
            />
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
          height: "72vh",
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
                A digital platform designed to support Anganwadi centers and the
                well-being of children and mothers. Seamless. Efficient.
                Impactful.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Highlight Section */}
      <Box
        sx={{
          backgroundColor: "white",
          paddingY: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: theme.palette.primary.main }}
        >
          Bridging Care and Technology
        </Typography>
        <Typography
          variant="subtitle1"
          mt={1}
          sx={{ color: "#5d4037", maxWidth: "100%", margin: "auto" }}
        >
          Our platform is designed to bring efficiency and compassion together —
          making everyday operations in Anganwadi centers smarter, simpler, and
          more impactful.
        </Typography>
      </Box>

      {/* About Section */}
      <Container sx={{ paddingY: 5 }}>
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
            <strong>CareNest</strong> is a modern web-based system built to
            enhance the operations of <strong>Anganwadi centers</strong>—an
            essential part of India’s Integrated Child Development Services
            (ICDS). These centers provide crucial support to{" "}
            <strong>children under six</strong>, <strong>pregnant women</strong>
            , and <strong>nursing mothers</strong>.
            <br />
            <br />
            Our platform helps streamline daily tasks like attendance tracking,
            nutrition monitoring, educational activities, health updates, and
            inventory management—creating a smarter, more connected ecosystem
            for grassroots childcare.
            <br />
            <br />
            With CareNest, we aim to bridge the gap between traditional
            practices and digital efficiency—empowering Anganwadi workers,
            supervisors, and administrators with the tools they need to create
            real change.
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
          At CareNest, our mission is to uplift rural communities by leveraging
          the power of digital transformation. We believe every child deserves a
          strong start, and every Anganwadi worker deserves strong support. Our
          system is built with care, compassion, and cutting-edge technology to
          make that vision a reality.
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

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          paddingY: 4,
          marginTop: 6,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 3,
            }}
          >
            {/* Left: Organization Info */}
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                CareNest - Anganwadi Automation System
              </Typography>
              <Typography variant="body2">
                Developed as part of the digital initiative to streamline
                activities in Anganwadi centers under the ICDS scheme.
              </Typography>
              <Typography variant="body2" mt={1}>
                For internal use by authorized personnel only. All activities
                are monitored and recorded.
              </Typography>
              <Typography variant="body2" mt={1}>
                &copy; {new Date().getFullYear()} CareNest. All rights reserved.
              </Typography>
            </Box>

            {/* Right: Admin Login */}
            <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
              <Typography variant="subtitle1" gutterBottom>
                Admin Access
              </Typography>
              <Typography variant="body2">
                Only authorized administrators are allowed to access the backend
                management portal.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#ef6c00",
                    borderColor: "white",
                  },
                }}
                onClick={() => {
                  window.location.href = "/admin/login";
                }}
              >
                Go to Admin Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll Buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: "#f57c00",
            color: "white",
            "&:hover": { backgroundColor: "#ef6c00" },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          onClick={scrollToBottom}
          sx={{
            backgroundColor: "#f57c00",
            color: "white",
            "&:hover": { backgroundColor: "#ef6c00" },
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
};

export default IndexPage;
