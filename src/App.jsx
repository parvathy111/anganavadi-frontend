import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// import { Routes, Route } from "react-router";

import IndexPage from "./pages/IndexPage";
import AdminDashboard from "./pages/AdminDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import BeneficiaryDashboard from "./pages/BeneficiaryDashboard";
import RegistrationForm from "./pages/RegistrationForm";
import Login from "./pages/Login";
import Adminlogin from "./pages/Adminlogin";
import AddVaccine from "./pages/AddVaccine";
import AddEvent from "./pages/AddEvent";
import AddProduct from "./pages/AddProduct";
import ApproveBeneficiaries from "./pages/ApproveBeneficiaries";
import ViewEvents from "./pages/ViewEvents";
import ViewVaccine from "./pages/ViewVaccine";
// import VaccineDetails from "./pages/VaccineDetails";

import { useState } from "react";
import AddSupervisor from "./pages/Addsupervisor";
import ViewSupervisorsList from "./pages/ViewSupervisorsList";
import ViewWorkerList from "./pages/ViewWorkerList";
import AddWorker from "./pages/AddWorker";
import ApproveEvents from "./pages/ApproveEvents";
import OrderStack from "./pages/OrderStock";
import PregLactWomenList from "./pages/ViewPregLactWomen";
import ParentList from "./pages/ViewChildList";
import ViewOrder from "./pages/ViewOrder";
import SupervisorViewOrder from "./pages/SupervisorViewOrder";
import AddAnganawadi from "./pages/AddAnganawadi";
import ViewSupervisorAnganawadi from "./pages/viewsupervisoranganawadi";



function App() {
  const [userRole, setUserRole] = useState("Worker");
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />}></Route>
        <Route path="/Worker-dashboard" element={<WorkerDashboard />}></Route>
        <Route path="/beneficiary-dashboard" element={<BeneficiaryDashboard />}></Route>
        <Route path="/add-vaccine" element={<AddVaccine />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/approve-beneficiaries" element={<ApproveBeneficiaries />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/view-vaccines" element={<ViewVaccine userRole={userRole} />} />
        {/* <Route path="/vaccine/:id" element={<VaccineDetails />} /> */}

        
      <Route path="/add-supervisor" element={<AddSupervisor />} />
      <Route path="/view-supervisors" element={<ViewSupervisorsList />} />
      <Route path="/view-workers" element={<ViewWorkerList />} />
      <Route path="/add-worker" element={<AddWorker />} />
      <Route path="/approve-events" element={<ApproveEvents />} />

      <Route path="/order-product" element={<OrderStack />} />
      <Route path="/view-order" element={<ViewOrder />} />
      <Route path="/supervisor-orders" element={<SupervisorViewOrder />} />

      <Route path="/view-preg-lact-women" element={<PregLactWomenList />} />
      <Route path="/view-child-parents" element={<ParentList />} />

      <Route path="/addanganawadi" element={<AddAnganawadi />} />
      <Route path="/view-anganawadis" element={<ViewSupervisorAnganawadi />} />
      </Routes>
   

    </>
  );
}

export default App;
