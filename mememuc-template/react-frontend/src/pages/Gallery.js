import React from "react";
import "../styles/gallery.css";
// import logo from "../pic/logo.jpg";
//this file is resposible for showing the existing pics
/**
 * hover effetc: https://www.youtube.com/watch?v=eZGHCRENcEk */
// import HorizontalScroll from "react-scroll-horizontal";

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
    let startImageIndex = this.state.startImageIndex;
    if (startImageIndex > 0) {
      startImageIndex -= 1;
    } else {
      startImageIndex = this.props.memes.length - 1;
    }
    this.setState({
      startImageIndex: startImageIndex,
    });
    const meme = this.props.memes[startImageIndex];
    this.props.selectImage(meme.url);
  }

  //next
  shiftRight() {
    let startImageIndex = this.state.startImageIndex;
    if (startImageIndex < this.props.memes.length - 1) {
      startImageIndex += 1;
    } else {
      startImageIndex = 0;
    }
    this.setState({
      startImageIndex: startImageIndex,
    });
    const meme = this.props.memes[startImageIndex];
    this.props.selectImage(meme.url);
  }

  handleImageClick(imgUrl) {
    this.props.selectImage(imgUrl);
  }

  render() {
    //put memes in the gallery
    let galleryImages = [];

    if (this.props.memes.length !== 0) {
      // api returns valid results

      const memes = Array.from(this.props.memes);

      const memesFirst = memes.slice(this.state.startImageIndex);
      const memesSecond = memes.slice(0, this.state.startImageIndex);

      galleryImages = memesFirst
        .concat(memesSecond)
        .map((meme) => (
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
        <button className="button" onClick={this.shiftLeft}>
          previous
        </button>
        <button className="button" onClick={this.shiftRight}>
          next
        </button>

        <div className="test">{galleryImages}</div>
      </div>
    );
  }
}

export default Gallery;
