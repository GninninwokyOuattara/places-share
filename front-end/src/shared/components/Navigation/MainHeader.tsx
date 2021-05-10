import React from "react";

import "./MainHeader.css";

interface props {
    children: any;
}

const MainHeader: React.FC<props> = ({ children }) => {
    return <header className="main-header">{children}</header>;
};

export default MainHeader;
