import React from "react";
import "../styles/App.css";
/**
 * put text on image:https://gist.github.com/petehouston/85dd33210c0764eeae55
 */
//this file controls the upload function and the function that adds the texts on the image

class MainImage extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {};

    this.canvasRef = React.createRef();
    this.downloadComposedImage = this.downloadComposedImage.bind(this);
    this.draw = this.draw.bind(this);
  }

  //bg-img: background image, the image first loaded
  componentDidUpdate() {
    const bgImage = document.getElementById("bg-img");
    bgImage.onload = this.draw;
    bgImage.src = this.props.image;
  }
  //set initial canvas height and width
  draw() {
    const canvas = this.canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const bgImage = document.getElementById("bg-img");
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    const inMemCanvas = document.createElement("canvas");
    const inMemCanvasCtx = inMemCanvas.getContext("2d");

    //put decoratingImages(later added) in an array
    for (let i = 0; i < this.props.decoratingImages.length; i++) {
      const decoratingImg = document.getElementById(`decorating-img-${i}`);
      console.log(decoratingImg.complete);
      const imgObj = this.props.decoratingImages[i];

      //add new memes above/below/left/right side of the origin memes on canvas
      if (imgObj.pos === "above") {
        const oldW = canvas.width;
        const oldH = canvas.height;
        inMemCanvas.width = oldW;
        inMemCanvas.height = oldH;
        inMemCanvasCtx.drawImage(canvas, 0, 0, oldW, oldH);
        canvas.height = oldH + oldW;
        ctx.drawImage(decoratingImg, 0, 0, oldW, oldW);
        ctx.drawImage(inMemCanvas, 0, oldW, oldW, oldH);
      } else if (imgObj.pos === "below") {
        const oldW = canvas.width;
        const oldH = canvas.height;
        inMemCanvas.width = oldW;
        inMemCanvas.height = oldH;
        inMemCanvasCtx.drawImage(canvas, 0, 0, oldW, oldH);
        canvas.height = oldH + oldW;
        ctx.drawImage(inMemCanvas, 0, 0, oldW, oldH);
        ctx.drawImage(decoratingImg, 0, oldH, oldW, oldW);
      } else if (imgObj.pos === "left") {
        const oldW = canvas.width;
        const oldH = canvas.height;
        inMemCanvas.width = oldW;
        inMemCanvas.height = oldH;
        inMemCanvasCtx.drawImage(canvas, 0, 0, oldW, oldH);
        canvas.width = oldW + oldH;
        ctx.drawImage(decoratingImg, 0, 0, oldH, oldH);
        ctx.drawImage(inMemCanvas, oldH, 0, oldW, oldH);
      } else {
        const oldW = canvas.width;
        const oldH = canvas.height;
        inMemCanvas.width = oldW;
        inMemCanvas.height = oldH;
        inMemCanvasCtx.drawImage(canvas, 0, 0, oldW, oldH);
        canvas.width = oldW + oldH;
        ctx.drawImage(inMemCanvas, 0, 0, oldW, oldH);
        ctx.drawImage(decoratingImg, oldW, 0, oldH, oldH);
      }
    }

    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.font = "40px serif";
    //here to set the location of the text shown on image
    ctx.fillText(this.props.text, 150, 280, 280);
    ctx.fillText(this.props.text1, 200, 210, 220);
    ctx.fillText(this.props.text2, 150, 200, 280);
  }

  //download image
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
    const elDecoratingImgs = this.props.decoratingImages.map((imgObj, i) => (
      <img
        key={`decorating-img-${i}`}
        id={`decorating-img-${i}`}
        src={imgObj.url}
        alt="a img"
        className="hidden-image"
      />
    ));

    return (
      <div>
        <div>
          <canvas ref={this.canvasRef} width="300" height="300"></canvas>
          <img
            id="bg-img"
            crossorigin="anonymous"
            alt="a img"
            className="hidden-image"
          />
          {elDecoratingImgs}
        </div>
        <div>
          <br />
          <input
            target="_blank"
            type="button"
            value="download"
            onClick={this.downloadComposedImage}
          />
        </div>
        <br />
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
          onChange={props.changeText2}
          value={props.text2}
        />
        <br />
        <input
          type="text"
          name="message"
          onChange={props.changeText1}
          value={props.text1}
        />
      </div>

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
