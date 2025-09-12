import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProcessExp from "./pages/ProcessExp";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProcessExp />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
