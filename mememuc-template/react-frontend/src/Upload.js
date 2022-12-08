import React, { useState } from "react";
import "./App.css";
//this file controls the upload function and the function that adds the texts on the image
const Upload = () => {
  const [image, setImage] = useState();
  const [text, setText] = useState("");

  function handleUploading(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const changeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h2>Add Image:</h2>
      <div id="box-search">
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
          <div className="caption">
            <p>{text}</p>
          </div>
        </div>
      </div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={changeText}
        value={text}
      />
      <br />
      <br /> <br />
    </div>
  );
};

export default Upload;
