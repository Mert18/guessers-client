"use client";
import GameWrapper from "@/components/games/GameWrapper";
import PickOneAndHopeInGame from "@/components/games/pickoneandhope/PickOneAndHopeInGame";
import PickOneAndHopeIntro from "@/components/games/pickoneandhope/PickOneAndHopeIntro";
import PickOneAndHopeSearchingRoom from "@/components/games/pickoneandhope/PickOneAndHopeSearchingRoom";
import { GameStateEnum, PickOneAndHopeObjectsEnum } from "@/enum/enum";
import { IGameRoom } from "@/types/IPickOneAndHope";
import { getAccessToken } from "@/util/sessionTokenAccessor";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";

const PickOneAndHope = () => {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.NOT_IN_ROOM
  );
  const [selectedObject, setSelectedObject] =
    useState<PickOneAndHopeObjectsEnum>(PickOneAndHopeObjectsEnum.CHERRY);

  const [roomInfo, setRoomInfo] = useState<IGameRoom>(null);

  const handleExitGame = () => {
    window.location.href = "/home";
  };

  const handleJoinARoom = () => {
    if (!connected || !clientRef.current) {
      console.error("Not connected to the STOMP broker.");
      return;
    }
    clientRef.current?.publish({
      destination: "/app/join",
      body: JSON.stringify({ object: selectedObject }),
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
    });

    setGameState(GameStateEnum.NOT_IN_ROOM);
  };

  useEffect(() => {
    getAccessToken().then((token) => {
      const client = new Client({
        brokerURL: `ws://localhost:8080/ws/websocket?token=${token}`,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => console.log(str),
        reconnectDelay: 5000,
        onConnect: () => {
          setConnected(true);

          client.subscribe(`/user/queue/room`, (message) => {
            const room = JSON.parse(message.body);
            setGameState(GameStateEnum.IN_GAME);
            setRoomInfo(room);
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
          />
        );
      case GameStateEnum.GAME_ENDED:
        return <div>Game Ended</div>;
      default:
        return <div>Game Not found</div>;
    }
  };

  return (
    <GameWrapper name="Pick One and Hope">{gameStateRender()}</GameWrapper>
  );
};

export default PickOneAndHope;
