import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypt" element={<Encrypt />} />
          <Route path="/decrypt" element={<Decrypt />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
