import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProcessExp from "./pages/ProcessExp";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import RecommendedInternships from "./pages/RecommendedInternships";
import StartProcess from "./pages/StartProcess";
import InternshipForm from "./pages/InternshipForm";

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
          <Route path="/recommendations" element={<RecommendedInternships />} />
          <Route path="/start-process" element={<StartProcess />} />
          <Route path="/form" element={<InternshipForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
