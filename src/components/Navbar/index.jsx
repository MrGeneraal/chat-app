import React, {useContext} from 'react';
import {signOut} from "firebase/auth";
import {auth} from '../../firebase'
import './style.css';
import {AuthContext} from "../../context/AuthContext";

function Navbar() {
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="navbar">
            <img className="logo" src="https://see.fontimg.com/api/renderfont4/2OOLW/eyJyIjoiZnMiLCJoIjo4MCwidyI6MTAwMCwiZnMiOjgwLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzE2MTYxNiIsInQiOjF9/TW9qaUNoYXQ/san-marino-beach.png" alt="3D fonts"/>
            <div className="user">
                <img className="image" src={currentUser.photoURL} alt=""/>
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)} className="button">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;