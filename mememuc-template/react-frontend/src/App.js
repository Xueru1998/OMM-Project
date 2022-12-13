import "./styles/App.css";
import Nav from "./pages/Nav";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Overview from "./pages/Overview";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
          <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;
