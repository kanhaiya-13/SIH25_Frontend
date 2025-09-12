import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProcessExp from "./pages/ProcessExp";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/process-exp" element={<ProcessExp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
