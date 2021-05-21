import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks: React.FC = () => {
    const auth = useContext(AuthContext) as { isLoggedIn: boolean };

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">NEW PLACE</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTIFICATE</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
