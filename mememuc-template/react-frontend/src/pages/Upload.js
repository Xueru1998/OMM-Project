import React from "react";
import "../styles/App.css";
//this file controls the upload function and the function that adds the texts on the image

class MainImage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.downloadComposedImage = this.downloadComposedImage.bind(this);
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const img = this.imageRef.current;
    const ctx = canvas.getContext("2d");

    if (img.complete) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.font = "40px serif";
      ctx.fillText(this.props.text, 150, 280, 280);
      ctx.fillText(this.props.text1, 200, 210, 220);
    } else {
      img.onload = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.font = "40px serif";
        ctx.fillText(this.props.text, 150, 280, 280);
        ctx.fillText(this.props.text1, 200, 210, 220);
      };
    }
  }

  downloadComposedImage() {
    const canvas = this.canvasRef.current;
    const canvasUrl = canvas.toDataURL();
    const eleAnchor = document.createElement("a");
    eleAnchor.href = canvasUrl;
    eleAnchor.download = "composed-image";
    eleAnchor.click();
    eleAnchor.remove();
  }

  render() {
    return (
      <div>
        <div>
          <canvas ref={this.canvasRef} width="300" height="300"></canvas>
          <img
            ref={this.imageRef}
            src={this.props.image}
            alt="a img"
            className="hidden-image"
          />
        </div>
        <div>
          <input
            type="button"
            value="download"
            onClick={this.downloadComposedImage}
          />
        </div>
      </div>
    );
  }
}

function InputGroup(props) {
  return (
    <div>
      <div>
        <input type="file" onChange={props.handleUploading} />
        <br />
        <input
          type="text"
          name="message"
          onChange={props.changeText1}
          value={props.text1}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          name="message"
          onChange={props.changeText}
          value={props.text}
        />
      </div>
    </div>
  );
}

export { MainImage, InputGroup };
