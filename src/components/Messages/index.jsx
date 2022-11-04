import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import Message from "../Message";
import {ChatContext} from "../../context/ChatContext";
import './style.css';


function MessageList() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    // if (messages < 0) {
    //     return (
    //         <div>
    //             Choose a chat to start the conversation
    //         </div>
    //     )
    // }

    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}

// function MessageList({ roomId }) {
//     const containerRef = React.useRef(null);
//     const { user } = useAuth();
//     const messages = useMessages(roomId);
//
//     React.useLayoutEffect(() => {
//         if (containerRef.current) {
//             containerRef.current.scrollTop = containerRef.current.scrollHeight;
//         }
//     });
//
//     return (
//         <div className="message-list-container" ref={containerRef}>
//             <ul className="message-list">
//                 {messages.map((x) => (
//                     <Message
//                         key={x.id}
//                         message={x}
//                         isOwnMessage={x.uid === user.uid}
//                     />
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// function Message({ message, isOwnMessage }) {
//     const { displayName, text } = message;
//     return (
//         <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
//             <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
//             <div>{text}</div>
//         </li>
//     );
// }

export default MessageList;