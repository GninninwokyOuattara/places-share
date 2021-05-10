import React from "react";

import "./Card.css";

interface props {
    children?: any;
    className?: any;
    style?: any;
}

const Card: React.FC<props> = (props) => {
    return (
        <div className={`card ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default Card;
