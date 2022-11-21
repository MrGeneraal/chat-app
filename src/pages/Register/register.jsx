import React, {useEffect, useState} from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom'
import Add from '../../img/addAvatar.png';
import './register.css';

function Register() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <div className="registerWrapper">
            <div className="registerContainer">
                <img src="https://see.fontimg.com/api/renderfont4/2OOLW/eyJyIjoiZnMiLCJoIjo4MCwidyI6MTAwMCwiZnMiOjgwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/TW9qaUNoYXQ/san-marino-beach.png" alt="3D fonts" style={{width: "50%"}}/>
                <h2 className="title">Sign up to join a chat room!</h2>
                <div  className="register">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="registerInput">
                            <input  id="displayName" placeholder="Username" type="text"/>
                            <input  id="email" placeholder="E-mail" type="email"/>
                            <input  id="password" placeholder="Password" type="password"/>
                            <input style={{ display: "none" }} type="file" id="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
                            <label htmlFor="file">
                                {imageUrl && selectedImage && (
                                    <div className="avatar">
                                        <div className="avatar-text">Preview: <br/>Click to edit</div>
                                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                    </div>
                                )}
                                {!imageUrl && !selectedImage && (
                                    <div className="avatar">
                                        <img className="img" src={Add} alt="" />
                                        <span>Add an avatar</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        <button className="registerButton" disabled={loading}>Sign up{loading &&
                            <div className="loadingio-spinner-double-ring-b354ft3whv">
                                <div className="ldio-kq7x7gk40hj">
                                    <div></div>
                                    <div></div>
                                    <div>
                                        <div></div>
                                    </div>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                                <style type="text/css"></style>
                            </div>
                        }</button>

                        {err && <span className="error">Something went wrong</span>}
                    </form>
                    <div className="loginLink">
                        Already have an account? <Link to="/login">Login here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register