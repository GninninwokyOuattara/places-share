import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

interface props {
    onClick: React.MouseEventHandler<Element>;
}

const Backdrop: React.FC<props> = (props) => {
    const content = <div className="backdrop" onClick={props.onClick}></div>;
    return ReactDOM.createPortal(
        content,
        document.getElementById("backdrop-hook") as Element
    );
};

export default Backdrop;
