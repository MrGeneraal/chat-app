import { MessageInput } from '../MessageInput';
import { Link, useParams } from 'react-router-dom';
import {useRooms} from "../../hooks/useRooms";
import { MessageList } from '../MessageList';
import './styles.css';


function ChatRoom() {
    const params = useParams();
    const room = useRooms().find((x) => x.id === params.id);
    const roomLength = useRooms().length;

    if (roomLength === 0) {
        return (
            <div>
                <div className="loadingio-spinner-ripple-ykt5go3qo1">
                    <div className="ldio-9o5yzbjtobh">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <style type="text/css"></style>
            </div>
        )
    }
    if (typeof(room) == "undefined") {
        return (
            <div className="error">
                <div className="error-message">Oops, this is not the room your looking for...</div>
                <div>
                    <Link to="/">⬅️ Back to all rooms</Link>
                </div>
            </div>

        )
    }

    return (
        <>
            <h2>{room.id}</h2>
            <div>
                <Link to="/">⬅️ Back to all rooms</Link>
            </div>
            <div className="messages-container">
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
        </>
    );
}

export { ChatRoom };