import React from "react";
import Homepage from "./Homepage";
import "../styles/App.css";
//the page for about
class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memesURL: [],
    };
  }
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
    console.log(randMeme);
    this.setState({
      memesURL: randMeme.url,
    });
    localStorage.setItem("pic", randMeme.url);
    localStorage.setItem("name", randMeme.name);
  };

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
        <button onClick={this.randomShow}>randomly show</button>
        <br />
        <br />
        <button className="button">next</button>
        <button className="button">previous</button>
        <br /> <br />
        <input
          className="comment"
          type="text"
          placeholder="please give your comment here"
        />
        <br />
        <br />
        <button>submit</button>
        <br />
      </div>
    );
  }
}
export default Details;
