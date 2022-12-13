import React from "react";

import Modal from "react-bootstrap/Modal";

class Decorate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      isPanelVisible: false,
      pos: "inside",
    };

    this.showPanel = this.showPanel.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.onPosChange = this.onPosChange.bind(this);
    this.handleUploading = this.handleUploading.bind(this);
  }

  showPanel() {
    this.setState({
      isPanelVisible: true,
    });
  }

  hidePanel() {
    this.setState({
      isPanelVisible: false,
    });
  }

  onPosChange(e) {
    this.setState({
      pos: e.target.value,
    });
  }

  handleUploading(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    this.setState({
      url: url,
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.showPanel}>
          add image
        </button>

        <Modal show={this.state.isPanelVisible} onHide={this.hidePanel}>
          <Modal.Header closeButton>
            <Modal.Title>Add Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="radio"
                value="above"
                checked={this.state.pos === "above"}
                name="image-position"
                onChange={this.onPosChange}
              />
              Above
              <input
                type="radio"
                value="below"
                checked={this.state.pos === "below"}
                name="image-position"
                onChange={this.onPosChange}
              />
              Below
              <input
                type="radio"
                value="left"
                checked={this.state.pos === "left"}
                name="image-position"
                onChange={this.onPosChange}
              />
              Left
              <input
                type="radio"
                value="right"
                checked={this.state.pos === "right"}
                name="image-position"
                onChange={this.onPosChange}
              />
              Right
            </div>
            <div>
              <div>
                <input type="file" onChange={this.handleUploading} />
              </div>
              <div>
                <img src={this.state.url} alt="no image selected" />
              </div>
            </div>
            {this.state.url && (
              <button
                onClick={() => {
                  this.props.decorateImage(this.state.url, this.state.pos);
                  this.hidePanel();
                }}
              >
                Add Image
              </button>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Decorate;
