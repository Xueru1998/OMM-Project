import React from "react";
import img1 from "./pics/img1.jpg";
import "./App.css";

function Display() {
  function handleClick(e) {
    //setSelected(URL.createObjectURL(e.target.files[0]));
    var input = document.getElementsByName("img1");
    console.log(input);
  }
  return (
    <div>
      <img src={img1} alt="" height="200" width="300" onClick={handleClick} />
    </div>
  );
}

export default Display;
