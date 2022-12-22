import React from "react";
import { Link } from "react-router-dom";
//the navigation bar "about" and "home"
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/ImageMeme">Make an image Meme</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
