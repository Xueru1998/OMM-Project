import React from "react";
import "../styles/gallery.css";
import logo from "../pic/logo.jpg";
//this file is resposible for showing the existing pics
/**
 * hover effetc: https://www.youtube.com/watch?v=eZGHCRENcEk */
import HorizontalScroll from "react-scroll-horizontal";

function GalleryImage(props) {
  return (
    <div className="toHover">
      <figure onClick={() => props.handleImageClick(props.imgUrl)}>
        <div className="thumbnail">
          <img
            src={props.imgUrl}
            className="image"
            alt=""
            height="100"
            width="120"
          />

          <div className="text">
            <p>{props.name}</p>
          </div>
        </div>
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

    this.handleImageClick = this.handleImageClick.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
  }

  //previous
  shiftLeft() {
    const startImageIndex = this.state.startImageIndex;
    if (startImageIndex > 0) {
      this.setState({
        startImageIndex: startImageIndex - 1,
      });
    }
  }

  //next
  shiftRight() {
    const startImageIndex = this.state.startImageIndex;
    if (startImageIndex < this.props.memes.length - 4) {
      this.setState({
        startImageIndex: startImageIndex + 1,
      });
    }
  }

  handleImageClick(imgUrl) {
    this.props.selectImage(imgUrl);
  }

  render() {
    //put memes in the gallery
    let galleryImages = [];

    if (this.props.memes.length !== 0) {
      // api returns valid results
      galleryImages = this.props.memes.map((meme) => (
        <GalleryImage
          key={meme.name}
          handleImageClick={this.handleImageClick}
          imgUrl={meme.url}
          name={meme.name}
        />
      ));
    }

    return (
      <div>
        <div className="my-row">{galleryImages}</div>

        <button className="button" onClick={this.shiftLeft}>
          previous
        </button>
        <button className="button" onClick={this.shiftRight}>
          next
        </button>

        <div className="test">
          <div className="testImage">
            <img src={logo} alt="" />
            <img src={logo} alt="" />
            <img src={logo} alt="" />
            <img src={logo} alt="" />v
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
