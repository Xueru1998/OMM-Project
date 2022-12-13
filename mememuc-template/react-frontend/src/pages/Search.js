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
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      keywords: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.keywords}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.search(this.state.keywords)}>
          search
        </button>
      </div>
    );
  }
}
export default Search;
