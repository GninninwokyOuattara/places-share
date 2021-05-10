import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

interface props {
    children: any;
    show: boolean;
    closeDrawerHandler: React.MouseEventHandler<Element>;
}

const SideDrawer: React.FC<props> = ({
    children,
    show,
    closeDrawerHandler,
}): React.ReactPortal => {
    const content = (
        <CSSTransition
            in={show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={closeDrawerHandler}>
                {children}
            </aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("drawer-hook") as Element
    );
};

export default SideDrawer;
