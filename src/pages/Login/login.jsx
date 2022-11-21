import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../../firebase";
import './login.css';
import {doc, setDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import img from '../../img/googleUser.png';


function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            console.log(err);
            setErr(true);
        }
    };

    // async function loginWithGoogle() {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const auth = getAuth();
    //
    //         provider.addScope('profile');
    //         provider.addScope('email');
    //         const user = await signInWithPopup(auth, provider).then(function (result) {
    //
    //             const user = result.user;
    //             return { uid: user.uid, displayName: user.displayName };
    //         });
    //         navigate("/");
    //         const date = new Date().getTime();
    //         const storageRef = ref(storage, `${user.displayName + date}`);
    //         const file = {img};
    //
    //         await uploadBytesResumable(storageRef, file).then(() => {
    //             getDownloadURL(storageRef).then(async (downloadURL) => {
    //                 try {
    //                     await updateProfile(user.user, {
    //                         displayName: user.displayName,
    //                         photoURL: downloadURL,
    //                     });
    //                     await setDoc(doc(db, "users", user.uid), {
    //                         uid: user.user.uid,
    //                         displayName: user.displayName,
    //                         email: user.email,
    //                         photoURL: downloadURL,
    //                     });
    //
    //                 } catch (error) {
    //                     if (error.code !== 'auth/cancelled-popup-request') {
    //                         console.error(error);
    //                     }
    //
    //                     return null;
    //                 }
    //             });
    //         });
    //     }   catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div className="loginWrapper">
            <div className="loginContainer">
                <img src="https://see.fontimg.com/api/renderfont4/2OOLW/eyJyIjoiZnMiLCJoIjo4MCwidyI6MTAwMCwiZnMiOjgwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/TW9qaUNoYXQ/san-marino-beach.png" alt="3D fonts" style={{width: "50%"}}/>
            <h2 className="title">Log in to join a chat room!</h2>
                <div className="fromWrapper">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="loginInput">
                            <input required id="email" placeholder="E-mail" type="email"/>
                            <input required id="password" placeholder="Password" type="password"/>
                        </div>
                        <button className="login-button">
                            Login
                        </button>
                        {err && <span className="error">Something went wrong</span>}
                    </form>
                    <div className="registerLink">
                        Don't have an account? <Link to="/register">Register here!</Link>
                    </div>
                    {/*<button onClick={loginWithGoogle}  className="google">*/}
                    {/*    Login with Google*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
}

export default Login