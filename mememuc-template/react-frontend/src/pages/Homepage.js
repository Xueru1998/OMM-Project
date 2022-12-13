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
      data: null,
    };

    this.handleUploading = this.handleUploading.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeText1 = this.changeText1.bind(this);
    this.changeText2 = this.changeText2.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.clear = this.clear.bind(this);
    this.search = this.search.bind(this);
    this.randomShow = this.randomShow.bind(this);
    this.initialURL = "https://api.imgflip.com/get_memes?per_page=5";
    this.searchURL = `https://api.imgflip.com/search_memes?query=${this.input}&per_page=15&page=1`;
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

  //clear the text on image
  clear() {
    this.setState({
      text: "",
      text1: "",
      text2: "",
    });
  }

  selectImage(imgUrl) {
    this.setState({
      image: imgUrl,
    });
  }

  search = async () => {
    const dataFetch = await fetch(this.initialURL, {
      method: "GET",
      headers: {
        Accept: "application.json",
      },
    });
    let parsedData = await dataFetch.json();
    this.setState({
      data: parsedData.data.memes,
    });
    console.log(parsedData);
    console.log(parsedData.data.memes[Math.floor(Math.random() * 100)]);
  };

  randomShow(imgUrl) {
    this.setState({
      image: "https://i.imgflip.com/24y43o.jpg",
    });
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Search data={this.state.data} search={this.search} />
        <br />
        <h2>please select a template below or upload your own template!</h2>
        <MainImage
          image={this.state.image}
          text={this.state.text}
          text1={this.state.text1}
          text2={this.state.text2}
        />
        <br />
        <button className="button" onClick={this.randomShow}>
          randomly show
        </button>

        <button className="button" onClick={this.clear}>
          clear
        </button>
        <br />
        <InputGroup
          handleUploading={this.handleUploading}
          changeText={this.changeText}
          changeText1={this.changeText1}
          changeText2={this.changeText2}
          text={this.state.text}
          text1={this.state.text1}
          text2={this.state.text2}
        />
        <Gallery selectImage={this.selectImage} data={this.state.data} />
      </div>
    );
  }
}

export default Homepage;
