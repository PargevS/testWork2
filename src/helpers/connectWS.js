import React, {useState, useRef, useEffect} from 'react';



export const useWSConnection = (url) => {
    const [connected, setConnected] = useState(false);
    const [serverData, setServerData] = useState([]);
    const socket = useRef();


    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            setConnected(true);
            console.log('success connection');
        }

        socket.current.onclose = () => {

        }

        socket.current.onerror = (err) => {
            console.log(err.message)
            console.log('An error has occurred');
        }
    }, [])


    useEffect(() => {
        socket.current.onmessage = (e) => {
            const mess = JSON.parse(e.data);
            setServerData(pr => [...pr, mess]);
        }
    }, [connected])



    const getData = () => serverData;


    return {getData}

}




