import React, { useEffect, useRef, useState } from "react";
import GameWrapper from "../GameWrapper";
import PickOneAndHopeIntro from "./PickOneAndHopeIntro";
import { GameStateEnum, PickOneAndHopeObjectsEnum } from "@/enum/enum";
import PickOneAndHopeSearchingRoom from "./PickOneAndHopeSearchingRoom";
import { Client } from "@stomp/stompjs";
import { getAccessToken } from "@/util/sessionTokenAccessor";
import { useSession } from "next-auth/react";
import { IGameRoom } from "@/types/IPickOneAndHope";
import PickOneAndHopeInGame from "./PickOneAndHopeInGame";

interface IPickOneAndHope {
  onClose: () => void;
}

const PickOneAndHope = ({ onClose }: IPickOneAndHope) => {
  const session = useSession();
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.NOT_IN_ROOM
  );
  const [selectedObject, setSelectedObject] =
    React.useState<PickOneAndHopeObjectsEnum>(PickOneAndHopeObjectsEnum.CHERRY);

  const [roomInfo, setRoomInfo] = useState<IGameRoom>(null);

  const handleExitGame = () => {
    onClose();
  };

  const handleJoinARoom = () => {
    if (!connected || !clientRef.current) {
      console.error("Not connected to the STOMP broker.");
      return;
    }
    clientRef.current?.publish({
      destination: "/app/join",
      body: JSON.stringify({ object: selectedObject }), // or your payload
    });
    setGameState(GameStateEnum.SEARCHING_ROOM);
  };

  const handleStopSearching = () => {
    if (!connected || !clientRef.current) {
      console.error("Not connected to the STOMP broker.");
      return;
    }
    clientRef.current?.publish({
      destination: "/app/cancel",
      body: JSON.stringify({ object: selectedObject }), // or your payload
    });

    setGameState(GameStateEnum.NOT_IN_ROOM);
  };

  useEffect(() => {
    getAccessToken()
      .then((token) => {
        console.log("Access Token:", token);
        const client = new Client({
          brokerURL: `ws://localhost:8080/ws/websocket?token=${token}`,
          connectHeaders: {
            Authorization: `Bearer ${token}`,
          },
          debug: (str) => console.log(str),
          reconnectDelay: 5000,
          onConnect: () => {
            setConnected(true);
            console.log("Connected!");

            client.subscribe(`/user/queue/room`, (message) => {
              const room = JSON.parse(message.body);
              setGameState(GameStateEnum.IN_GAME);
              setRoomInfo(room);
              console.log("Received room info:", room);
            });
          },
          onStompError: (frame) => {
            console.error("Broker error:", frame);
          },
          onWebSocketError: (error) => {
            console.error("WebSocket error:", error);
          },
        });

        client.activate();
        clientRef.current = client;

        return () => {
          client.deactivate();
        };
      })
      .catch((error) => {
        console.error("Error getting access token:", error);
      });
  }, []);

  const gameStateRender = () => {
    switch (gameState) {
      case GameStateEnum.NOT_IN_ROOM:
        return (
          <PickOneAndHopeIntro
            handleJoinARoom={() => handleJoinARoom()}
            setSelectedObject={setSelectedObject}
            selectedObject={selectedObject}
            handleExitGame={() => handleExitGame()}
          />
        );
      case GameStateEnum.SEARCHING_ROOM:
        return (
          <PickOneAndHopeSearchingRoom
            selectedObject={selectedObject}
            handleStopSearching={() => handleStopSearching()}
          />
        );
      case GameStateEnum.IN_GAME:
        return (
          <PickOneAndHopeInGame
            client={clientRef.current}
            roomInfo={roomInfo}
            onClose={onClose}
          />
        );
      case GameStateEnum.GAME_ENDED:
        return <div>Game Ended</div>;
      default:
        return <div>Game Not found</div>;
    }
  };

  return <GameWrapper>{gameStateRender()}</GameWrapper>;
};

export default PickOneAndHope;
