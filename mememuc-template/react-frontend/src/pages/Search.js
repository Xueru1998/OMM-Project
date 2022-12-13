import React from "react";
//reponsible for searching event
// function Search() {
//   return (
//     <div className="search">
//       <input type="text" />
//       <button>Search</button>
//     </div>
//   );
// }
class Search extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={this.props.search}>search</button>
      </div>
    );
  }
}
export default Search;
