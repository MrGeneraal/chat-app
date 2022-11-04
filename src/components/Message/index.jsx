import React, { useContext, useEffect, useRef } from "react";
import './style.css'
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    
    function messageOwner() {
        if (message.senderId === currentUser.uid) {
            return (
                <div className={"messageContentOwner"}>
                    <p>{message.text}</p>
                    {message.img && <img src={message.img} alt=""/>}
                </div>
            )
        }
        return (
            <div className={"messageContent"}>
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt=""/>}
            </div>
        )
    }

    if (message.text) {
        return (
            <div
                ref={ref}
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
            >
                <div className="messageInfo">
                    <img
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                        }
                        alt=""
                    />
                </div>
                {messageOwner()}
            </div>
        );
    } else {
        return (
            <div
                ref={ref}
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
            >
                <div className="messageInfo">
                    <img
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                        }
                        alt=""
                    />
                </div>
                <div className="messageContent">
                    {message.img && <img src={message.img} alt=""/>}
                </div>
            </div>
        );
    }
};

export default Message;