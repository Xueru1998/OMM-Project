import React from "react";
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

    this.handleImageClick = this.handleImageClick.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
    this.imagesAPI = this.props.data;
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
    if (startImageIndex < this.imagesAPI.length - 3) {
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

    const galleryImages =
      this.imagesAPI &&
      this.imagesAPI
        .slice(this.state.startImageIndex, this.state.startImageIndex + 4)
        .map(
          (imagesAPI) => (
            <GalleryImage
              key={imagesAPI.id}
              handleImageClick={this.handleImageClick}
              imgUrl={imagesAPI.url}
            />
          ),
          console.log(this.imagesAPI)
        );

    return (
      <div>
        <div className="row">
          {galleryImages}
          {/* <img src="https://i.imgflip.com/30b1gx.jpg" alt="" /> */}
        </div>

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
