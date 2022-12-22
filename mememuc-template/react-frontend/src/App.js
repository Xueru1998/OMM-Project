import "./styles/App.css";
import Nav from "./pages/Nav";
import ImageMeme from "./pages/ImageMeme";
import About from "./pages/About";
import HomePage from "./pages/Post";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/ImageMeme" element={<ImageMeme />} />
      </Routes>
    </div>
  );
}

export default App;
