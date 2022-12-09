import React from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import { MainImage, InputGroup } from "./Upload";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: "",
    };

    this.handleUploading = this.handleUploading.bind(this);
    this.changeText = this.changeText.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  handleUploading(e) {
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
    });
  }

  changeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  selectImage(imgUrl) {
    this.setState({
      image: imgUrl,
    });
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Search />
        <MainImage image={this.state.image} text={this.state.text} />
        <InputGroup
          handleUploading={this.handleUploading}
          changeText={this.changeText}
          text={this.state.text}
        />
        <Gallery selectImage={this.selectImage} />
      </div>
    );
  }
}

export default Homepage;
