import React from "react";
import Homepage from "./Homepage";
import "../styles/App.css";
import likes from "../pic/likes.png";
import dislikes from "../pic/dislikes.png";
//the page for about
/**
 * copyright free likes and dislikes icon:
 * vexteezy: https://www.vecteezy.com/vector-art/5352847-like-and-dislike-icon-vector-design
 */
class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      randomMemesURL: [],
      memesIndex: null,
      memesUrl: [],
      length: null,
      memes: [],
      memesName: null,
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.firstEntry = this.firstEntry.bind(this);
  }

  firstEntry = async () => {
    const url = "http://localhost:3002/memesJson";
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const parsedData = await dataFetch.json();

    /* console.log(randMeme); */
    this.setState({
      memesUrl: parsedData.map((memes) => memes.url),
      /* memesIndex: index, */
      length: parsedData.length,
      memes: parsedData,
      memesName: parsedData.map((memes) => memes.name),
    });
    var index = -1;
    var memesName = localStorage.getItem("name");
    var getIndex = this.state.memes.find(function (item, i) {
      if (item.name === memesName) {
        index = i;
        return i;
      }
    });
    console.log(index, getIndex);

    this.setState({
      memesIndex: index,
    });
  };

  //random show the memes from database
  randomShow = async () => {
    const url = "http://localhost:3002/memesJson";
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const parsedData = await dataFetch.json();

    const index = Math.floor(Math.random() * parsedData.length);
    const randMeme = parsedData[index];
    /* console.log(randMeme); */
    this.setState({
      memesUrl: parsedData.map((memes) => memes.url),
      memesIndex: index,
    });
    localStorage.setItem("pic", randMeme.url);
    localStorage.setItem("name", randMeme.name);

    console.log(index);
  };

  componentDidMount() {
    this.firstEntry();
  }
  //bug!!!!!!
  next() {
    if (this.state.memesIndex < this.state.length)
      this.setState({
        memesIndex: this.state.memesIndex + 1,
      });

    localStorage.setItem("pic", this.state.memesUrl[this.state.memesIndex]);
    localStorage.setItem("name", this.state.memesName[this.state.memesIndex]);
  }

  previous() {
    if (this.state.memesIndex > 0) {
      this.setState({
        memesIndex: this.state.memesIndex - 1,
      });
      localStorage.setItem("pic", this.state.memesUrl[this.state.memesIndex]);
      localStorage.setItem("name", this.state.memesName[this.state.memesIndex]);
    }

    console.log(this.state.memesIndex);
  }

  render() {
    return (
      <div>
        <h1>{localStorage.getItem("name")}</h1>
        <h2>author</h2>
        <h3>description</h3>
        <img
          src={localStorage.getItem("pic")}
          alt=""
          height="500"
          width="500"
        />
        <br />
        <br />
        <img src={likes} alt="" height="30" width="30" className="button" />
        <img src={dislikes} alt="" height="30" width="30" />
        <br />
        <br />
        <button onClick={this.randomShow}>randomly show</button>
        <br />
        <br />
        <button className="button" onClick={this.previous}>
          previous
        </button>
        <button className="button" onClick={this.next}>
          next
        </button>
        <br /> <br />
        <input
          className="comment"
          type="text"
          placeholder="please give your comment here"
        />
        <br />
        <br />
        <p>
          <a href="http://localhost:3000/sign-in">sign in</a> to leave a comment
          here!
        </p>
        <br />
        <button>submit</button>
        <br />
      </div>
    );
  }
}
export default Details;
