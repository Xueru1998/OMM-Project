import React from "react";
import Homepage from "./Homepage";
import "../styles/App.css";
//the page for about
class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>name</h1>
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
      </div>
    );
  }
}
export default Details;
