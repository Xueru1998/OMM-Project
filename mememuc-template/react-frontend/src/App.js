import "./styles/App.css";
import Nav from "./pages/Nav";
import ImageMeme from "./pages/ImageMeme";
import About from "./pages/About";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import Details from "./pages/Details";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/ImageMeme" element={<ImageMeme />} />
        <Route path="/details" element={<Details />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
