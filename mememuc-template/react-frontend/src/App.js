import "./App.css";
import React, { useState } from "react";
import Nav from "./Nav";
import Homepage from "./Homepage";
import About from "./About";
import { Routes, Route } from "react-router-dom";

function App() {
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <h2>Add Image:</h2>
      <input type="file" id="image-input" onChange={handleChange} />
      <img src={file} height="200" width="300" />
    </div>
  );
}

export default App;
