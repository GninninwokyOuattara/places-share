import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const ModalOverlay: React.FC<any> = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form
                action=""
                onSubmit={
                    props.onSubmit ? props.onSubmit : (e) => e.preventDefault()
                }
            >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return createPortal(
        content,
        document.getElementById("modal-hook") as Element
    );
};

export default ModalOverlay;
