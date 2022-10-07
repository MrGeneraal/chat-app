import React from 'react';
import {getRooms} from '../services/firebase';

function useRooms() {
    const [rooms, setRooms] = React.useState([]);

    React.useEffect(() => {
        return getRooms(setRooms);
    }, []);

    return rooms;
}

export { useRooms };