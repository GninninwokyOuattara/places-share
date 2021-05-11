import React from "react";
import { CSSTransition } from "react-transition-group";

import ModalOverlay from "./ModalOverlay";
import Backdrop from "./Backdrop";
import Map from "./Map";

import "./Modal.css";

const Modal: React.FC<any> = (props) => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props}>{/* <Map /> */}</ModalOverlay>
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
