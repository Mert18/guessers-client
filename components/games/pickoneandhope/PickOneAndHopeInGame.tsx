import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { IGameRoom } from "@/types/IPickOneAndHope";
import Image from "next/image";
import { GameStateEnum } from "@/enum/enum";
import CustomButton from "@/components/common/CustomButton";

interface InGameProps {
  client: Client;
  roomInfo: IGameRoom;
  onClose: () => void;
}

const PickOneAndHopeInGame = ({ client, roomInfo, onClose }: InGameProps) => {
  const [gameStatusMessage, setGameStatusMessage] = React.useState<string>("");
  const [round, setRound] = React.useState<number>(1);
  const [roundPicks, setRoundPicks] = React.useState<string[]>([]);
  const [gameStatus, setGameStatus] = React.useState<GameStateEnum>();
  const [playersScore, setPlayersScore] = React.useState<{
    [key: string]: number;
  }>({
    [roomInfo.players[0].username]: 0,
    [roomInfo.players[1].username]: 0,
  });

  useEffect(() => {
    const topic = `/topic/room/${roomInfo.id}`;

    const subscription = client.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      console.log("Game message:", data);
      if (data.action === "START") {
        setGameStatusMessage("Starting the game...");
      } else if (data.action === "ROUND") {
        setGameStatus(GameStateEnum.IN_GAME);
        setRound(data.round);
        setRoundPicks(data.roundPicks);
        setPlayersScore({
          [roomInfo.players[0].username]:
            data.playersScore[roomInfo.players[0].username],
          [roomInfo.players[1].username]:
            data.playersScore[roomInfo.players[1].username],
        });
      } else if (data.action === "END") {
        setGameStatus(GameStateEnum.GAME_ENDED);
        setGameStatusMessage("Game ended.");
      }

      // handle game updates here (opponent action, game result, etc.)
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client, roomInfo]);

  const objectRenderer = (object: string) => {
    return (
      <img
        src={`/icons/games/pickoneandhope/${object}.svg`}
        alt={object}
        className="w-10 h-10"
      />
    );
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-center items-center flex-col">
        {roomInfo.players[0].username}

        {objectRenderer(roomInfo.players[0].object)}

        {playersScore[roomInfo.players[0].username]}
      </div>
      <div className="flex-1">
        {gameStatus === GameStateEnum.GAME_ENDED ? (
          <div>
            <h2 className="text-xl font-bold">Game Over</h2>

            {Object.entries(playersScore).map(([username, score]) => (
              <p key={username} className="text-lg">
                {username}: {score} points
              </p>
            ))}

            {playersScore[roomInfo.players[0].username] >
            playersScore[roomInfo.players[1].username] ? (
              <p className="text-green-500">
                Player {roomInfo.players[0].username} wins!
              </p>
            ) : playersScore[roomInfo.players[0].username] <
              playersScore[roomInfo.players[1].username] ? (
              <p className="text-red-500">
                Player {roomInfo.players[1].username} wins!
              </p>
            ) : (
              <p className="text-yellow-500">It's a tie!</p>
            )}

            <div className="mt-4">
              <CustomButton
                type="submit"
                text={"Exit Game"}
                bg={true}
                onClick={() => onClose()}
              />
            </div>
          </div>
        ) : (
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Round {round}</h2>
            <p>{gameStatusMessage}</p>
            <div className="flex justify-center items-center mt-4">
              <div className="grid grid-cols-3 gap-4 mt-4">
                {roundPicks.map((pick, index) => (
                  <div className="w-14 h-14 flex items-center justify-center">
                    <Image
                      key={index}
                      src={`/icons/games/pickoneandhope/${pick}.svg`}
                      alt={pick}
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-col">
        {roomInfo.players[1].username}
        {objectRenderer(roomInfo.players[1].object)}
        {playersScore[roomInfo.players[1].username]}
      </div>
    </div>
  );
};

export default PickOneAndHopeInGame;
