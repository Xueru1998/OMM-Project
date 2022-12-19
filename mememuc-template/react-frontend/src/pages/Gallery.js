import React from "react";
import "../styles/gallery.css";
//this file is resposible for showing the existing pics
/**
 * hover effetc: https://www.youtube.com/watch?v=eZGHCRENcEk */

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
    // <div className="toHover">
    //   <figure onClick={() => props.handleImageClick(props.imgUrl)}>
    //     <img
    //       src={props.imgUrl}
    //       className="image"
    //       alt=""
    //       height="100"
    //       width="120"

    //     />
    //   </figure>
    // </div>
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
    // const galleryImages = this.imageUrls
    //   .slice(this.state.startImageIndex, this.state.startImageIndex + 3)
    //   .map((imageUrl) => (
    //     <GalleryImage
    //       key={imageUrl}
    //       handleImageClick={this.handleImageClick}
    //       imgUrl={imageUrl}
    //     />
    //   ));

    //put memes in the gallery
    let galleryImages = [];

    if (this.props.memes.length !== 0) {
      // api returns valid results
      galleryImages = this.props.memes
        .slice(this.state.startImageIndex, this.state.startImageIndex + 5)
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
        <div className="my-row">{galleryImages}</div>

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
