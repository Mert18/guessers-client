import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocket = (url) => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  const token = session.access_token;

  useEffect(() => {
    const newSocket = new WebSocket(`${url}?token=${token}`); 
    newSocket.onopen = (event) => {
      console.log("WebSocket connection opened", event);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    setSocket(newSocket);
    socketRef.current = newSocket;

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [url]);

  const sendMessage = useCallback(
    (message) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(message));
      } else {
        console.error("WebSocket connection not open");
      }
    },
    []
  );

  return { socket, sendMessage };
};

export default useWebSocket;