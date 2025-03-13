import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Adminlogin from "./pages/Adminlogin";
import AddVaccine from "./pages/AddVaccine";
import RegistrationForm from "./pages/RegistrationForm";
import AddEvent from "./pages/AddEvent";
import AddProduct from "./pages/AddProduct";
import ApproveBeneficiaries from "./pages/ApproveBeneficiaries";
import ViewEvents from "./pages/ViewEvents";
import ViewVaccine from "./pages/ViewVaccine";
// import VaccineDetails from "./pages/VaccineDetails";

import { useState } from "react";
import IndexPage from "./pages/IndexPage";


function App() {
  const [userRole, setUserRole] = useState("Worker");
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/add-vaccine" element={<AddVaccine />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/approve-beneficiaries" element={<ApproveBeneficiaries />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/vaccines" element={<ViewVaccine userRole={userRole} />} />
        {/* <Route path="/vaccine/:id" element={<VaccineDetails />} /> */}
      </Routes>
    </>
  );
}

export default App;
