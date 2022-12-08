import React from "react";
import { Link } from "react-router-dom";
//the navigation bar "about" and "home"
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
