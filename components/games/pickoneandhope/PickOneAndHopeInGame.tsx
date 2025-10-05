import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { IGameRoom } from "@/types/IPickOneAndHope";
import Image from "next/image";
import { ColorEnum, GameStateEnum } from "@/enum/enum";
import CustomButton from "@/components/common/CustomButton";
import Loader from "@/components/common/Loader";

interface InGameProps {
  client: Client;
  roomInfo: IGameRoom;
}

const PickOneAndHopeInGame = ({ client, roomInfo }: InGameProps) => {
  const [gameStatusMessage, setGameStatusMessage] = useState<string>("");
  const [round, setRound] = useState<number>(1);
  const [roundPicks, setRoundPicks] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStateEnum>();
  const [playersScore, setPlayersScore] = useState<{
    [key: string]: number;
  }>({
    [roomInfo.players[0].username]: 0,
    [roomInfo.players[1].username]: 0,
  });
  const [matchResults, setMatchResults] = useState<
    ("null" | "left" | "right")[]
  >([]);
  const [scoreDelta, setScoreDelta] = useState<{ [key: string]: number }>({});
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [triggerMove, setTriggerMove] = useState(false);

  useEffect(() => {
    const topic = `/topic/room/${roomInfo.id}`;

    const subscription = client.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      if (data.action === "START") {
        setGameStatusMessage("Starting the game...");
      } else if (data.action === "ROUND") {
        setGameStatus(GameStateEnum.IN_GAME);
        setRound(data.round);
        setRoundPicks(data.roundPicks);
        setMatchResults(data.matchResults);
        setTriggerPulse(true);
        setTriggerMove(false);

        setTimeout(() => {
          setTriggerPulse(false);
          setTriggerMove(true);
        }, 1000);
        setScoreDelta({
          [roomInfo.players[0].username]: data.matchResults.filter(
            (m: string) => m === "left"
          ).length,
          [roomInfo.players[1].username]: data.matchResults.filter(
            (m: string) => m === "right"
          ).length,
        });
        setTimeout(() => setScoreDelta({}), 1000);
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
      <div className="flex justify-center items-center flex-col bg-gray-50 text-primary p-2 rounded-md mb-2 border border-primary w-36">
        <p className="py-2 text-xl">{roomInfo.players[0].username}</p>

        {objectRenderer(roomInfo.players[0].object)}

        <p className="py-2 text-3xl">
          {playersScore[roomInfo.players[0].username]}
        </p>

        {scoreDelta[roomInfo.players[0].username] ? (
          <span className="text-green-500 animate-fade-in-up">
            +{scoreDelta[roomInfo.players[0].username]}
          </span>
        ) : null}
      </div>
      <div className="flex-1 mx-20">
        {gameStatus === GameStateEnum.GAME_ENDED ? (
          <div>
            <h2 className="font-bold text-2xl text-primary">Game Over</h2>
            <div className="flex justify-between text-primary-darker">
              {Object.entries(playersScore).map(([username, score]) => (
                <p key={username}>
                  {username}: <span className="text-2xl">{score} points</span>
                </p>
              ))}
            </div>

            {playersScore[roomInfo.players[0].username] >
            playersScore[roomInfo.players[1].username] ? (
              <p className="">
                Player{" "}
                <span className="text-3xl px-4 text-green-500">
                  {roomInfo.players[0].username}
                </span>{" "}
                wins!
              </p>
            ) : playersScore[roomInfo.players[0].username] <
              playersScore[roomInfo.players[1].username] ? (
              <p className="">
                Player{" "}
                <span className="text-3xl px-4 text-green-500">
                  {roomInfo.players[1].username}
                </span>{" "}
                wins!
              </p>
            ) : (
              <p className="text-yellow-500">It's a tie!</p>
            )}

            <div className="mt-4">
              <CustomButton
                type="submit"
                text={"Play Again"}
                bg={true}
                onClick={() =>
                  (window.location.href = "/home/publicgames/pickoneandhope")
                }
              />
            </div>
            <div className="mt-4">
              <CustomButton
                type="submit"
                color={ColorEnum.FAILURE}
                text={"Exit Game"}
                bg={true}
                onClick={() => (window.location.href = "/home")}
              />
            </div>
          </div>
        ) : (
          <div className="text-center mb-4">
            {roundPicks.length === 0 ? (
              <>
                <p>Loading the game...</p>
                <Loader />
              </>
            ) : (
              <>
                <h2 className="font-bold">Round {round}</h2>
                <p>{gameStatusMessage}</p>
                <div className="flex justify-center items-center mt-4">
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {roundPicks.map((pick, index) => {
                      const match = matchResults[index];
                      const shouldPulse = triggerPulse && match !== "null";
                      const shouldMove = triggerMove && match !== "null";

                      return (
                        <div
                          key={index}
                          className={`
        w-14 h-14 flex items-center justify-center
        transition-transform duration-500
        ${shouldPulse ? "animate-pulse-grow" : ""}
        ${shouldMove && match === "left" ? "animate-to-left" : ""}
        ${shouldMove && match === "right" ? "animate-to-right" : ""}
      `}
                        >
                          <Image
                            src={`/icons/games/pickoneandhope/${pick}.svg`}
                            alt={pick}
                            width={40}
                            height={40}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center flex-col bg-gray-50 text-primary p-2 rounded-md mb-2 border border-primary w-36">
        <p className="py-2 text-xl">{roomInfo.players[1].username}</p>
        {objectRenderer(roomInfo.players[1].object)}
        <p className="py-2 text-3xl">
          {playersScore[roomInfo.players[1].username]}
        </p>
        {scoreDelta[roomInfo.players[1].username] ? (
          <span className="text-green-500 animate-fade-in-up">
            +{scoreDelta[roomInfo.players[1].username]}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default PickOneAndHopeInGame;
