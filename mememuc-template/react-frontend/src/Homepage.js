import React, { useState } from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import Upload from "./Upload";

const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Search />
      <Upload />
      <Gallery />
    </div>
  );
};

export default Homepage;
