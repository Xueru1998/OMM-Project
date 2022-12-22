/**
 * References:
 * https://getbootstrap.com/docs/4.0/layout/media-object/#example
 * https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
 * to fetch json file from mongodb:https://www.pluralsight.com/guides/get-json-of-mongo-collection-with-and-xhr-request
 * to use localstorage to store the img url and use in another component:
 *
 * */

import "../styles/homepage.css";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Details from "./Details";

// function Post() {
//   let navigate = useNavigate();
//   const element = document.getElementById("singlepost");
//   function navigateToSingleView() {
//     navigate("meme", {
//       itemId: 1,
//     });
//   }

//   return (
//     <>
//       <div
//         id="singlepost"
//         className="parent-div"
//         onClick={navigateToSingleView}
//       >
//         <div className="media-left">
//           <img className="img" src={logo} alt="Generic placeholder image" />
//         </div>
//         <div className="media-body">
//           <h5>Title</h5>
//           <p>by author</p>
//         </div>
//       </div>

//       <div
//         id="singlepost"
//         className="parent-div"
//         onClick={navigateToSingleView}
//       >
//         <div className="media-left">
//           <img className="img" src={logo} alt="Generic placeholder image" />
//         </div>
//         <div className="media-body">
//           <h5>Title</h5>
//           <p>by author</p>
//         </div>
//       </div>

//       <div
//         id="singlepost"
//         className="parent-div"
//         onClick={navigateToSingleView}
//       >
//         <div className="media-left">
//           <img className="img" src={logo} alt="Generic placeholder image" />
//         </div>
//         <div className="media-body">
//           <h5>Title</h5>
//           <p>by author</p>
//         </div>
//       </div>
//       <div
//         id="singlepost"
//         className="parent-div"
//         onClick={navigateToSingleView}
//       >
//         <div className="media-left">
//           <img className="img" src={logo} alt="Generic placeholder image" />
//         </div>
//         <div className="media-body">
//           <h5>Title</h5>
//           <p>by author</p>
//         </div>
//       </div>
//     </>
//   );
// }
function Memes() {
  return (
    <div className="border">
      <div className="container">
        <img
          src={this.state.createdMemes}
          alt=""
          height="200"
          width="200"
        ></img>
      </div>
    </div>
  );
}

export function GetUrl(e) {
  let clickedUrl = null;
  /* let url = e.target.getAttribute("src");
  const [data, setData] = useState([]);
  useEffect(() => {
    localStorage.setItem("dataKey", JSON.stringify(url));
  }, [data]); */
  localStorage.setItem(clickedUrl, e.target.getAttribute("src"));
  let value = localStorage.getItem(clickedUrl);
  console.log(value);
}
class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdMemes: [],
      memesURL: [],
      clickedUrl: null,
    };
    this.setMemes = this.setMemes.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  setMemes = async () => {
    const url = "http://localhost:3002/memesJson";
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      /* body: body, */
    });
    const parsedData = await dataFetch.json();
    console.log(parsedData);
    this.setState({
      createdMemes: parsedData,
      memesURL: parsedData.map((memes) => memes.url),
    });
  };

  componentDidMount() {
    this.setMemes();
  }

  onClick(e) {
    this.setState({
      clickedUrl: e.target.getAttribute("src"),
    });

    window.localStorage.setItem("pic", e.target.getAttribute("src"));
    window.localStorage.setItem("name", e.target.getAttribute("data-tag"));
    let a = localStorage.getItem("pic");
    let b = e.target.getAttribute("data-tag");

    console.log(b);
  }

  render() {
    Memes =
      this.state.createdMemes &&
      this.state.createdMemes.map((memes) => (
        <div className="border">
          <div className="container">
            <h3>name: {memes.name}</h3>
            <br />
            <a href="/details" target="_self">
              <img
                src={memes.url}
                alt=""
                height="200"
                width="200"
                onClick={(e) => this.onClick(e)}
                key={memes.name}
                data-tag={memes.name}
              ></img>
            </a>

            <br />
            <h4>author</h4>
          </div>
        </div>
      ));

    return <div>{Memes}</div>;
  }
}

export default Homepage;
