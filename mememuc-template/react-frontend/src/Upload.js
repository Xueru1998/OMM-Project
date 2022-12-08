import React, { useState } from "react";
import "./App.css";

const Upload = () => {
  const [image, setImage] = useState();
  const [text, setText] = useState("");

  function handleUploading(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  }
  const change = (event) => {
    setText(event.target.value);
    console.log(event.target.event);
  };

  return (
    <div>
      <h2>Add Image:</h2>
      <div class="row" id="box-search">
        <div class="thumbnail text-center">
          <img
            src={image}
            alt=""
            class="img-responsive"
            height="200"
            width="300"
          />
          <br />
          <br />
          <input type="file" id="image-input" onChange={handleUploading} />
          <br />
          <br />
          <div class="caption">
            <p>{text}</p>
          </div>
        </div>
      </div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={change}
        value={text}
      />
      <br />
      <br /> <br />
    </div>
  );
};

export default Upload;
