import React from 'react';
import './style.css';
import Navbar from "../Navbar";
import {Chats} from "../Chats";
import Search from "../Search";

function Sidebar(props) {
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";

    return (
        <div className={sidebarClass}>
            <Navbar/>
            <Search/>
            <Chats toggleSidebar={props.toggleSidebar} />
        </div>
    );
}

export default Sidebar;