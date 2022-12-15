import React from "react";
import "../styles/App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

/**
 * put text on image:https://gist.github.com/petehouston/85dd33210c0764eeae55
 * share options: https://www.google.com/search?q=share+react&sxsrf=ALiCzsY85P13olZurY4q12lEthni5qJheg:1671069287877&source=lnms&tbm=vid&sa=X&ved=2ahUKEwja57Gawvr7AhW0SfEDHUkaCO4Q_AUoAnoECAEQBA&biw=1440&bih=764&dpr=2#fpstate=ive&vld=cid:d105195e,vid:9WzIACv_mxs
 * react-share: https://www.npmjs.com/package/react-share
 * to convert uri to blob data https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
 */
//this file controls the upload function and the function that adds the texts on the image

class MainImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasRef: null,
      isPanelVisible: false,
      canvasImgUrl: null,
    };

    this.canvasRef = React.createRef();
    this.convertDataURItoBlob = this.convertDataURItoBlob.bind(this);
    this.saveMeme = this.saveMeme.bind(this);
    this.downloadComposedImage = this.downloadComposedImage.bind(this);
    this.draw = this.draw.bind(this);
    this.showPanel = this.showPanel.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
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

  //
  convertDataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(",")[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  async saveMeme() {
    const formData = new FormData();

    const canvas = this.canvasRef.current;
    const canvasImgUrl = canvas.toDataURL();

    formData.append("file", this.convertDataURItoBlob(canvasImgUrl));
    formData.append("name", "random-name");
    formData.append("author", "");

    const res = await fetch("http://localhost:3003/memes/add_meme", {
      method: "POST",
      body: formData,
    });

    console.log(res);
  }

  //download image
  downloadComposedImage() {
    const canvas = this.canvasRef.current;
    const canvasImgUrl = canvas.toDataURL();
    const eleAnchor = document.createElement("a");
    eleAnchor.href = canvasImgUrl;

    eleAnchor.download = this.props.memeName;
    eleAnchor.click();
    eleAnchor.remove();
  }

  showPanel() {
    const canvas = this.canvasRef.current;
    const canvasImgUrl = canvas.toDataURL();

    this.setState({
      isPanelVisible: true,
      canvasImgUrl: canvasImgUrl,
    });
  }

  hidePanel() {
    this.setState({
      isPanelVisible: false,
      canvasImgUrl: null,
    });
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
          <button onClick={this.showPanel}>generate</button>
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal show={this.state.isPanelVisible} onHide={this.hidePanel}>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>This is your final meme!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <img
                    src={this.state.canvasImgUrl}
                    height="240px"
                    width="200px"
                    alt=""
                    style={{ textAlign: "center" }}
                  />
                  <div>
                    <p>Do you agree to share your meme to our database?</p>
                    <input type="checkbox" name="" value="" />
                    <label for="a"></label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Name your meme!"
                      onChange={this.props.changeMemeName}
                      required
                    />
                  </div>
                  <br />
                  <div className="share">
                    <FacebookShareButton url={this.props.image}>
                      <FacebookIcon size={40} round={true}></FacebookIcon>
                    </FacebookShareButton>

                    <TwitterShareButton url={this.props.image}>
                      <TwitterIcon size={40} round={true}></TwitterIcon>
                    </TwitterShareButton>

                    <EmailShareButton url={this.props.image}>
                      <EmailIcon size={40} round={true}></EmailIcon>
                    </EmailShareButton>

                    <WhatsappShareButton url={this.props.image}>
                      <WhatsappIcon size={40} round={true}></WhatsappIcon>
                    </WhatsappShareButton>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.downloadComposedImage}>download</Button>

                  <Button variant="primary" onClick={this.saveMeme}>
                    Save changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.hidePanel();
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default MainImage;
