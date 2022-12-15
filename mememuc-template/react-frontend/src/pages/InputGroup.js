import React from "react";
import "../styles/App.css";


/**
 * put text on image:https://gist.github.com/petehouston/85dd33210c0764eeae55
 * share options: https://www.google.com/search?q=share+react&sxsrf=ALiCzsY85P13olZurY4q12lEthni5qJheg:1671069287877&source=lnms&tbm=vid&sa=X&ved=2ahUKEwja57Gawvr7AhW0SfEDHUkaCO4Q_AUoAnoECAEQBA&biw=1440&bih=764&dpr=2#fpstate=ive&vld=cid:d105195e,vid:9WzIACv_mxs
 * react-share: https://www.npmjs.com/package/react-share
 */
//this file controls the upload function and the function that adds the texts on the image

function InputGroup(props) {
  return (
    <div>
      <div>
        <input type="file" onChange={props.handleUploading} />

        <br />
        <input
          type="text"
          name="message"
          onChange={props.changeText2}
          value={props.text2}
        />
        <br />
        <input
          type="text"
          name="message"
          onChange={props.changeText1}
          value={props.text1}
        />
      </div>

      <div>
        <input
          type="text"
          name="message"
          onChange={props.changeText}
          value={props.text}
        />
      </div>
    </div>
  );
}

export default InputGroup;
