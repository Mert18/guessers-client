"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";

interface IActiveGuessPaperProps {
  guesses: ICreateGuessPaperGuess[];
  totalOdds: number;
  stake: number;
  setStake: (stake: number) => void;
  wins: number;
  roomUser: IRoomUser;
  resetGuessPaper: () => void;
}

const ActiveGuessPaper = ({
  guesses,
  totalOdds,
  stake,
  setStake,
  wins,
  roomUser,
  resetGuessPaper,
}: IActiveGuessPaperProps) => {

  const sendGuessPaper = () => {
    if (guesses.length === 0) {
      toast.error("Your guess paper is empty.");
      return;
    }
    const guessPaperToCreate = {
      guesses: guesses,
      stake: stake,
      roomId: roomUser.room.id,
    };

    createGuessPaper(guessPaperToCreate).finally(() => {
      resetGuessPaper();
    });
  };

  return (
    <>
      <ComponentTitle text={"currentGuessPaper"} icon="/ticket.svg" />
      <div className="flex w-full">
        <div className="flex justify-start items-start text-text flex-col bg-background-bright border-2 border-primary-default p-2 text-text-default w-full">
          <div className="flex justify-around w-full items-center h-full">
            <div className="flex flex-col justify-center items-start">
              <p className="text-xs">{"Total Odds"}</p>
              <p className="text-sm text-primary font-bold">{totalOdds}</p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-xs">{"Stakes"}</p>
              <p>
                <span className="font-bold">{stake}</span>{" "}
                <button onClick={() => setStake(stake + 50)}>+</button>{" "}
                <button
                  onClick={() => {
                    if (stake > 100) {
                      setStake(stake - 50);
                    }
                  }}
                >
                  -
                </button>
              </p>
            </div>

            <div className="flex flex-col justify-center items-start">
              <p className="text-xs">{"Wins"}</p>
              <p className="text-sm font-bold text-primary">{wins}₺</p>
            </div>
          </div>
        </div>
        <button className="bg-primary-default hover:bg-primary-bright text-background-bright p-2 flex flex-col w-12 font-bold" onClick={() => sendGuessPaper()}>
          <span>C</span>
          <span>R</span>
          <span>E</span>
          <span>A</span>
          <span>T</span>
          <span>E</span>
        </button>
      </div>
    </>
  );
};

export default ActiveGuessPaper;
