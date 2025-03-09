import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
