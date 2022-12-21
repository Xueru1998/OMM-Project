import React from "react";
import "../styles/App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/**
 * put text on image:https://gist.github.com/petehouston/85dd33210c0764eeae55
 * share options: https://www.google.com/search?q=share+react&sxsrf=ALiCzsY85P13olZurY4q12lEthni5qJheg:1671069287877&source=lnms&tbm=vid&sa=X&ved=2ahUKEwja57Gawvr7AhW0SfEDHUkaCO4Q_AUoAnoECAEQBA&biw=1440&bih=764&dpr=2#fpstate=ive&vld=cid:d105195e,vid:9WzIACv_mxs
 * react-share: https://www.npmjs.com/package/react-share
 */
//this file controls the upload function and the function that adds the texts on the image

class InputGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPanelVisible: false,
      templateUrl: "",
    };
    this.showPanel = this.showPanel.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.changeTemplateUrl = this.changeTemplateUrl.bind(this);
  }

  changeTemplateUrl(e) {
    this.setState({
      templateUrl: e.target.value,
    });
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

  render() {
    return (
      <div>
        <div>
          <button onClick={this.showPanel}>Upload a new template</button>

          <div>
            <Modal show={this.state.isPanelVisible} onHide={this.hidePanel}>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Upload your own tempalte here!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <input type="file" onChange={this.props.handleUploading} />
                  <div>
                    <input type="checkbox" name="" value="" />
                    <label for="a"></label>
                    <p>Allow this template to be uploaded in our database</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Please give your URL here!"
                      onChange={this.changeTemplateUrl}
                      value={this.props.templateUrl}
                    />
                  </div>
                  <br />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.hidePanel();
                    }}
                  >
                    upload
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.hidePanel();
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>
          </div>
        </div>

        <div>
          <br />
          <input
            type="text"
            name="message"
            onChange={this.props.changeText2}
            value={this.props.text2}
          />
          <br />
          <input
            type="text"
            name="message"
            onChange={this.props.changeText1}
            value={this.props.text1}
          />
        </div>

        <div>
          <input
            type="text"
            name="message"
            onChange={this.props.changeText}
            value={this.props.text}
          />
        </div>
      </div>
    );
  }
}

export default InputGroup;
