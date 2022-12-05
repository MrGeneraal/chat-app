import React, {useContext, useEffect, useState} from "react";
import './settings.css';
import img from "../../img/googleUser.png";
import Add from "../../img/addAvatar.png";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {AuthContext} from "../../context/AuthContext";

function Settings() {
    const {currentUser} = useContext(AuthContext);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        const displayName = e.target[0].value;
        const file = e.target[1].files[0];

        const res = getAuth();

        try {
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.currentUser, {
                            displayName,
                            photoURL: downloadURL,
                        });

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
        if (currentUser.photoURL) {
            setImageUrl(currentUser.photoURL);
        }
        
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [currentUser.photoURL, selectedImage]);

    function openHome() {
        navigate('/');
    }

    return (
        <div className={"settings-wrapper"}>
            <div className={"account"}>
                <img onClick={openHome} src="https://see.fontimg.com/api/renderfont4/2OOLW/eyJyIjoiZnMiLCJoIjo4MCwidyI6MTAwMCwiZnMiOjgwLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/TW9qaUNoYXQ/san-marino-beach.png" alt="3D fonts" style={{width: "50%", cursor: "pointer"}}/>
                <h2 className="title">Account settings</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="registerInput">
                        <input id="displayName" placeholder="Username" type="text" defaultValue={currentUser.displayName}/>
                        <input style={{ display: "none" }} type="file" id="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
                        <label htmlFor="file">
                            {imageUrl && !selectedImage && (
                                <div className="avatar">
                                    <div className="avatar-text">Preview: <br/>Click to edit</div>
                                    <img src={imageUrl} height="100px"  alt={""}/>
                                </div>
                            )}
                            {imageUrl && selectedImage && (
                                <div className="avatar">
                                    <div className="avatar-text">Preview: <br/>Click to edit</div>
                                    <img src={imageUrl} height="100px"  alt={""}/>
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
                    <button className="registerButton" disabled={loading}>Save{loading &&
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
            </div>
        </div>
    );
}

export default Settings