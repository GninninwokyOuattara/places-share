import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks: React.FC = () => {
    const auth = useContext(AuthContext) as {
        userId: string;
        isLoggedIn: boolean;
        logout: () => void;
    };

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
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

            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
