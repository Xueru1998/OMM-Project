import "./styles/App.css";
import Nav from "./pages/Nav";
import ImageMeme from "./pages/ImageMeme";
import About from "./pages/About";
import Overview from "./pages/Overview";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<ImageMeme />} />
        <Route path="/about" element={<About />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;
