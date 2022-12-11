import React from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import { MainImage, InputGroup } from "./Upload";

class Homepage extends React.Component {
  //set two text input text, text1 and text2
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: "",
      text1: "",
      text2: "",
    };

    this.handleUploading = this.handleUploading.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeText1 = this.changeText1.bind(this);
    this.changeText2 = this.changeText2.bind(this);
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

  changeText1(e) {
    this.setState({
      text1: e.target.value,
    });
  }

  changeText2(e) {
    this.setState({
      text2: e.target.value,
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
        <br />
        <h2>please select a template below or upload your own template!</h2>
        <MainImage
          image={this.state.image}
          text={this.state.text}
          text1={this.state.text1}
          text2={this.state.text2}
        />
        <InputGroup
          handleUploading={this.handleUploading}
          changeText={this.changeText}
          changeText1={this.changeText1}
          changeText2={this.changeText2}
          text={this.state.text}
          text1={this.state.text1}
          text2={this.state.text2}
        />
        <Gallery selectImage={this.selectImage} />
      </div>
    );
  }
}

export default Homepage;
