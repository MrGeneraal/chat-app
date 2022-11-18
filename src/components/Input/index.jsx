import React, {useContext, useEffect, useState} from "react";
import InputEmoji from 'react-input-emoji';
import Attach from '../../img/attach.png'
import Img from '../../img/img.png'
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import './style.css';

function Input(props) {
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (text.length > 0 || selectedImage != null) {
            if (selectedImage && text.length > 0) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, selectedImage);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    }
                );
            } else if (selectedImage) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, selectedImage);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    }
                );
            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            setText("");
            setSelectedImage(null);
        }
    };

    const [iconsHidden, setIconsHidden] = useState(false);

    const handleChange = (value) => {
        setText(value);

        if (value.length > 0) {
            setIconsHidden(true);
        }

        if (value.length === 0) {
            setIconsHidden(false);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const cancelSelectedImage = () => {
      setSelectedImage(null);
      setImageUrl(null);
    }

    return (
        <div className="input-wrapper">
            <div className={imageUrl && selectedImage ? "inputWithSelectedImage" : "input"}>
                {imageUrl && selectedImage && (
                    <div className="selectedImage">
                        <div className="selectedImage-text">Selected image: </div>
                        <img src={imageUrl} alt={selectedImage.name} className="selectedImage-img" />
                        <div className="cancelSelectedImage" onClick={cancelSelectedImage}>Cancel</div>
                    </div>
                )}
                <InputEmoji
                    type="text"
                    placeholder="Enter a message..."
                    value={text}
                    onChange={handleChange}
                    onEnter={handleSend}
                    cleanOnEnter
                    className="message-input"
                    required
                    minLength={1}
                />
            </div>
            <div className="send">
                <div className={iconsHidden ? 'icons hidden' : 'icons'}>
                <img src={Attach} alt=""/>
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt=""/>
                </label>
                </div>
                <button onClick={handleSend} className="send-message">Send</button>
            </div>
        </div>
    );
}
export default Input;