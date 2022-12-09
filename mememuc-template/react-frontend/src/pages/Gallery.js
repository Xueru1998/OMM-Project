import React from "react";
import img1 from "../pics/img1.jpg";
import img2 from "../pics/img2.jpg";
import dog from "../pics/dog.jpg";
import dog1 from "../pics/dog copy.jpg";
import dog2 from "../pics/dog copy 2.jpg";
import dog3 from "../pics/dog copy 3.jpg";
import "../styles/gallery.css";
//this file is resposible for showing the existing pics

function GalleryImage(props) {
  return (
    <div className="toHover">
      <figure onClick={() => props.handleImageClick(props.imgUrl)}>
        <img
          src={props.imgUrl}
          className="image"
          alt=""
          height="100"
          width="100"
        />
      </figure>
    </div>
  );
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startImageIndex: 0,
    };

    this.imageUrls = [dog, img1, img2, dog1, dog2, dog3];

    this.handleImageClick = this.handleImageClick.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
  }

  shiftLeft() {
    const startImageIndex = this.state.startImageIndex;
    if (startImageIndex > 0) {
      this.setState({
        startImageIndex: startImageIndex - 1,
      });
    }
  }

  shiftRight() {
    const startImageIndex = this.state.startImageIndex;
    if (startImageIndex < this.imageUrls.length - 3) {
      this.setState({
        startImageIndex: startImageIndex + 1,
      });
    }
  }

  handleImageClick(imgUrl) {
    this.props.selectImage(imgUrl);
  }

  render() {
    const galleryImages = this.imageUrls
      .slice(this.state.startImageIndex, this.state.startImageIndex + 3)
      .map((imageUrl) => (
        <GalleryImage
          key={imageUrl}
          handleImageClick={this.handleImageClick}
          imgUrl={imageUrl}
        />
      ));

    return (
      <div>
        <div className="row">{galleryImages}</div>
        <button className="button" onClick={this.shiftLeft}>
          previous
        </button>
        <button className="button" onClick={this.shiftRight}>
          next
        </button>
      </div>
    );
  }
}

export default Gallery;
