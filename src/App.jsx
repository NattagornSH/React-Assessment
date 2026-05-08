import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import Home from "./components/Home";
import Owner from "./components/Owner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<Owner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
