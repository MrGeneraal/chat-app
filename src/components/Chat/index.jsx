import Input from '../Input';
import MessageList from '../Messages';
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import './style.css';
import React, {useContext} from "react";
import {ChatContext} from "../../context/ChatContext";


function Chat(props) {
    const { data } = useContext(ChatContext);

    if (data === null) {
        return (
            <div>
                Choose a chat to start the conversation
            </div>
        )
    }

    return (
        <div className="chat">
            <div className="chatInfo">
                <button onClick={props.toggleSidebar} className="sidebar-toggle">
                    ☰
                </button>
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt=""/>
                    <img src={Add} alt=""/>
                    <img src={More} alt=""/>
                </div>
            </div>
            <MessageList/>
            <Input/>
        </div>
    );
}

export default Chat;

// const params = useParams();
// const room = useRooms().find((x) => x.id === params.id);
// const roomLength = useRooms().length;
//
// if (roomLength === 0) {
//     return (
//         <div>
//             <div className="loadingio-spinner-ripple-ykt5go3qo1">
//                 <div className="ldio-9o5yzbjtobh">
//                     <div></div>
//                     <div></div>
//                 </div>
//             </div>
//             <style type="text/css"></style>
//         </div>
//     )
// }
// if (typeof(room) == "undefined") {
//     return (
//         <div className="error">
//             <div className="error-message">Oops, this is not the room your looking for...</div>
//             <div>
//                 <Link to="/">⬅️ Back to all rooms</Link>
//             </div>
//         </div>
//
//     )
// }

            // <h2>{room.id}</h2>
            // <div>
            //     <Link to="/">⬅️ Back to all rooms</Link>
            // </div>
            // <div className="messages-container">
            //     <Messages roomId={room.id} />
            //     <Input roomId={room.id} />
            // </div>
