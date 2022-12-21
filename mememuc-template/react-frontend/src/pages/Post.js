/**
 * References:
 * https://getbootstrap.com/docs/4.0/layout/media-object/#example
 * https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
 * to fetch json file from mongodb:https://www.pluralsight.com/guides/get-json-of-mongo-collection-with-and-xhr-request
 * */

import Card from "react-bootstrap/Card";
import "../styles/post.css";
import logo from "../pic/logo.jpg";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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

function Post() {
  const [createdMemes, setCreatedMemes] = useState();
  useEffect(() => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        const response = JSON.parse(request.response);
        setCreatedMemes(response);
      }
    };
    request.open("GET", "http://localhost:3002/memesJson", true);
    request.send();
  }, []);

  useEffect(() => {
    console.log(createdMemes);
  }, [createdMemes]);
  return (
    <div className="App">
      {createdMemes &&
        createdMemes.map((createdMemes) => (
          <img src={createdMemes.url} alt=""></img>
        ))}
    </div>
  );
}
export default Post;
