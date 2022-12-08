import React, { useState } from "react";
import Search from "./Search";

const Homepage = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <h1>Homepage</h1>
      <Search />
      <h2>Add Image:</h2>
      <input type="file" id="image-input" onChange={handleChange} />
      <img src={file} height="200" width="300" />
    </div>
  );
};

export default Homepage;
