import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProcessExp from "./pages/ProcessExp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProcessExp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
