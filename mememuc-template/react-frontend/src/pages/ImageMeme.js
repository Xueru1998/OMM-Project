import React from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import Decorate from "./Decorate";
import { MainImage, InputGroup } from "./Upload";

import "bootstrap/dist/css/bootstrap.min.css";

class Homepage extends React.Component {
  /**
   * text, text1, text2: set three text input text, text1 and text2
   * image: url of image
   * memes: array of fetched memes' APIs
   * decoratingImages: array of added images in the same canvas
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: "",
      text1: "",
      text2: "",
      memes: [],
      decoratingImages: [],
      name: [],
      memesUrl: [],
    };

    this.handleUploading = this.handleUploading.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeText1 = this.changeText1.bind(this);
    this.changeText2 = this.changeText2.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.decorateImage = this.decorateImage.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);

    this.randomShow = this.randomShow.bind(this);
    this.imgflipApiPrefix = "https://api.imgflip.com";
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

  //each added images in the same canvas has two state: url and position
  decorateImage(imgUrl, imgPos) {
    console.log(imgUrl, imgPos);
    const decoratingImages = Array.from(this.state.decoratingImages);
    decoratingImages.push({
      url: imgUrl,
      pos: imgPos,
    });
    console.log("decorateImage...");
    console.log(decoratingImages);
    this.setState({
      decoratingImages: decoratingImages,
    });
  }

  componentDidMount() {
    this.search();
  }

  //fetch search url and parse, could be be used
  search = async (keywords) => {
    console.log(`keywords: ${keywords}`);
    let url = "";
    let method = "";
    let body = null;
    if (keywords && keywords.length !== 0) {
      url = `${this.imgflipApiPrefix}/search_memes`;
      method = "POST";
      body = JSON.stringify({
        username: "",
        password: "",
        query: keywords,
      });
    } else {
      url = `${this.imgflipApiPrefix}/get_memes`;
      method = "GET";
    }

    //fetch memes' url and parse to json file
    const dataFetch = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
      },
      body: body,
    });
    const parsedData = await dataFetch.json();

    console.log(parsedData);
    // console.log(parsedData.data.memes);

    this.setState({
      memes: parsedData.data.memes,
      memesUrl: parsedData.data.memes.map((memes) => memes.url),
      name: parsedData.data.memes.map((memes) => memes.name),
      image: parsedData.data.memes[0].url,
    });
  };

  //random show the memes from API
  randomShow = async () => {
    const url = `${this.imgflipApiPrefix}/get_memes`;
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const parsedData = await dataFetch.json();
    const memes = parsedData.data.memes;
    const index = Math.floor(Math.random() * memes.length);
    const randMeme = memes[index];
    console.log(randMeme);
    this.setState({
      image: randMeme.url,
    });
  };

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Search search={this.search} />
        <br />
        <h2>please select a template below or upload your own template!</h2>
        <MainImage
          image={this.state.image}
          decoratingImages={this.state.decoratingImages}
          text={this.state.text}
          text1={this.state.text1}
          text2={this.state.text2}
          name={this.state.name}
        />
        <br />
        <button className="button" onClick={this.randomShow}>
          randomly show
        </button>
        <button className="button" onClick={this.clear}>
          clear
        </button>

        <Decorate decorateImage={this.decorateImage} />
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
        <Gallery
          selectImage={this.selectImage}
          memes={this.state.memes}
          name={this.state.name}
          memesUrl={this.state.memesUrl}
          image={this.state.image}
        />
      </div>
    );
  }
}

export default Homepage;