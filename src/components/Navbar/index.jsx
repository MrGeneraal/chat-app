import React, {useContext} from 'react';
import {signOut} from "firebase/auth";
import {auth} from '../../firebase'
import './style.css';
import {AuthContext} from "../../context/AuthContext";
import Menu from "../../img/menu.png";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const {currentUser} = useContext(AuthContext);

    function show() {
        document.getElementById("logout").classList.toggle("show");
    }

    window.onclick = function(event) {
        if (!event.target.matches('.open-settings')) {
            const dropdowns = document.getElementsByClassName("settings-menu-wrapper");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    const navigate = useNavigate();

    function openAccount() {
        navigate('/settings');
    }

    return (
        <div className="navbar">
            <img className="logo" src="https://see.fontimg.com/api/renderfont4/2OOLW/eyJyIjoiZnMiLCJoIjo4MCwidyI6MTAwMCwiZnMiOjgwLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzE2MTYxNiIsInQiOjF9/TW9qaUNoYXQ/san-marino-beach.png" alt="3D fonts"/>
            <div className="user">
                <img className="image" src={currentUser.photoURL} alt=""/>
                <span>{currentUser.displayName}</span>
                <div className={"settings"}>
                    <img src={Menu} alt="Dots menu" className={"open-settings"} onClick={show} />
                    <div className={"settings-menu-wrapper"} id={"logout"}>
                        <div className={"settings-menu"}>
                            <button onClick={()=>signOut(auth)} className="settings-btn">Logout</button>
                            <button onClick={openAccount} className={"settings-btn"}>Account settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;