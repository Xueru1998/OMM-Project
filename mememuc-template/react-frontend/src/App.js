import "./styles/App.css";
import Nav from "./pages/Nav";
import ImageMeme from "./pages/ImageMeme";
import About from "./pages/About";
import Overview from "./pages/Overview";
import SingleView from "./pages/SingleView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/mememaker" element={<ImageMeme />} />
        <Route path="/about" element={<About />} />
          <Route path="/" element={<Overview />} />
          <Route path='/meme' element={<SingleView />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

      </Routes>
    </div>
  );
}

export default App;
