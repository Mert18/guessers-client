import React, { useState } from "react";
import GameWrapper from "../GameWrapper";
import PickOneAndHopeIntro from "./PickOneAndHopeIntro";
import { GameStateEnum, PickOneAndHopeObjectsEnum } from "@/enum/enum";
import SearchingRoom from "../SearchingRoom";
import PickOneAndHopeSearchingRoom from "./PickOneAndHopeSearchingRoom";

interface IPickOneAndHope {
  onClose: () => void;
}

const PickOneAndHope = ({ onClose }: IPickOneAndHope) => {
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.NOT_IN_ROOM
  );
  const [selectedObject, setSelectedObject] =
    React.useState<PickOneAndHopeObjectsEnum>(PickOneAndHopeObjectsEnum.CHERRY);

  const handleExitGame = () => {
    onClose();
  };

  const handleJoinARoom = () => {
    console.log("Selected Object: ", selectedObject);
    // handle join a room
    setGameState(GameStateEnum.SEARCHING_ROOM);
  };

  const handleStopSearching = () => {
    // handle stop searching
    console.log("Stop Searching");
    setGameState(GameStateEnum.NOT_IN_ROOM);
  };

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
      case GameStateEnum.IN_ROOM:
        return <div>In Room</div>;
      case GameStateEnum.STARTING_GAME:
        return <div>Starting Game...</div>;
      case GameStateEnum.IN_GAME:
        return <div>In Game</div>;
      case GameStateEnum.GAME_ENDED:
        return <div>Game Ended</div>;
      default:
        return <div>Game Not found</div>;
    }
  };

  return <GameWrapper>{gameStateRender()}</GameWrapper>;
};

export default PickOneAndHope;
