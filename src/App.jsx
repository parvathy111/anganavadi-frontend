import "./App.css";
import Login from "./pages/Login";
import Adminlogin from "./pages/Adminlogin";
import AddVaccine from "./pages/AddVaccine";
import RegistrationForm from "./pages/RegistrationForm";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/add-vaccine" element={<AddVaccine />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
