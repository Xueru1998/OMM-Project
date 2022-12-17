import "./styles/App.css";
import Nav from "./pages/Nav";
import ImageMeme from "./pages/ImageMeme";
import About from "./pages/About";
import Overview from "./pages/Overview";
import SingleView from "./pages/SingleView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoggedIn from "./pages/LoggedIn";
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
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/userDetails' element={<LoggedIn />} />
      </Routes>
    </div>
  );
}

export default App;
