import React from "react";
import img1 from "./pics/img1.jpg";
import img2 from "./pics/img2.jpg";
import dog from "./pics/dog.jpg";
import "./App.css";
//this file is resposible for showing the existing pics

function Display() {
  return (
    <div>
      <div className="row">
        <div className="toHover">
          <div id="zoom">
            <figure>
              <img
                src={img1}
                className="image"
                alt=""
                height="100"
                width="100"
              />
            </figure>
          </div>
        </div>

        <div className="toHover">
          <div id="zoom">
            <figure>
              <img
                src={img2}
                className="image"
                alt=""
                height="100"
                width="100"
              />
            </figure>
          </div>
        </div>

        <div className="toHover">
          <div id="zoom">
            <figure>
              <img
                src={dog}
                className="image"
                alt=""
                height="100"
                width="100"
              />
            </figure>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div></div>
      <button className="button">previous</button>
      <button className="button">next</button>
    </div>
  );
}

export default Display;
