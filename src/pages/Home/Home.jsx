import React, {useState} from 'react'
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import './style.css';

const Home = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    function closeSideBar() {
        setSideBarOpen(false);
    }

    return (
        <div className="home">
            <div className="container">
                <Sidebar toggleSidebar={closeSideBar} isOpen={sidebarOpen}/>
                <Chat toggleSidebar={handleViewSidebar}/>
            </div>
        </div>
    )
}

export default Home