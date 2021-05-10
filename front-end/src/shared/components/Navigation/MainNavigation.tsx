import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        return setIsDrawerOpen(true);
    };

    const closeDrawer: React.MouseEventHandler<Element> = (e) => {
        return setIsDrawerOpen(false);
    };

    return (
        <>
            {isDrawerOpen && <Backdrop onClick={closeDrawer} />}

            <SideDrawer show={isDrawerOpen} closeDrawerHandler={closeDrawer}>
                <NavLinks />
            </SideDrawer>

            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={openDrawer}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;
